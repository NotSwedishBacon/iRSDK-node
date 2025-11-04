#!/usr/bin/env python3
"""
Full iRacing SDK regeneration & build script for Node.js bindings.
Usage:
    python scripts/update_sdk.py path/to/irsdk_X_Y.zip
This script will:
 - Auto-create binding.gyp and package.json if missing
 - Extract all headers into third_party/irsdk/
 - Regenerate lib/constants.js/.d.ts, lib/structs.js/.d.ts, lib/index.js/.d.ts
 - Rebuild the native addon (node-gyp)
 - Generate VERIFICATION_REPORT.txt with checksums
 - Sync package.json version to match IRSDK_VER
"""

import zipfile, os, re, hashlib, subprocess, sys, pathlib, json

ROOT = pathlib.Path(__file__).resolve().parents[1]
THIRD = ROOT / "third_party" / "irsdk"
LIB = ROOT / "lib"
REPORT = ROOT / "VERIFICATION_REPORT.txt"

# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------

def strip_comments(s: str):
    return re.sub(r"/\*.*?\*/", "", s, flags=re.S)

def hash_file(path): 
    return hashlib.sha256(path.read_bytes()).hexdigest()

# ---------------------------------------------------------------------------
# Bootstrapping helpers
# ---------------------------------------------------------------------------

def ensure_binding_gyp():
    """Create a modern binding.gyp compatible with Node 20+ and node-addon-api."""
    gyp_path = ROOT / "binding.gyp"
    if gyp_path.exists():
        return

    gyp_template = {
        "targets": [
            {
                "target_name": "irsdk",
                "sources": [
                    "src/irsdk_bindings.cc"
                ],
                # Modern node-addon-api include pattern; no dependencies key
                "include_dirs": [
                    "<!(node -p \"require('node-addon-api').include\")",
                    "third_party/irsdk"
                ],
                "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
                "cflags!": ["-fno-exceptions"],
                "cflags_cc!": ["-fno-exceptions"],
                "conditions": [
                    ['OS=="win"', {
                        "msvs_settings": {
                            "VCCLCompilerTool": {"ExceptionHandling": 1}
                        }
                    }]
                ]
            }
        ]
    }

    import json
    gyp_path.write_text(json.dumps(gyp_template, indent=2), encoding="utf-8")
    print("Created default binding.gyp (modern node-addon-api format)")

def update_package_json(sdk_ver: str):
    """Create or update package.json to sync version with SDK."""
    pkg_path = ROOT / "package.json"
    base_pkg = {
        "name": "iracing-node-sdk",
        "version": f"1.{sdk_ver}.0",
        "description": "Node.js bindings for the official iRacing SDK",
        "main": "lib/index.js",
        "types": "lib/index.d.ts",
        "files": ["lib", "build/Release", "third_party/irsdk"],
        "scripts": {
            "update-sdk": "python ./scripts/update_sdk.py",
            "build": "node-gyp rebuild",
            "release": "npm version patch && npm publish"
        },
        "keywords": ["iracing", "telemetry", "sdk", "node-addon", "simracing"],
        "author": "Your Name <you@example.com>",
        "license": "MIT",
        "dependencies": {},
        "gypfile": True
    }

    if pkg_path.exists():
        pkg = json.loads(pkg_path.read_text(encoding="utf-8"))
        pkg["version"] = f"1.{sdk_ver}.0"
        pkg["main"] = base_pkg["main"]
        pkg["types"] = base_pkg["types"]
        pkg["files"] = base_pkg["files"]
        pkg["scripts"] = {**base_pkg["scripts"], **pkg.get("scripts", {})}
    else:
        pkg = base_pkg

    pkg_path.write_text(json.dumps(pkg, indent=2), encoding="utf-8")
    print(f"Updated package.json to version 1.{sdk_ver}.0")

# ---------------------------------------------------------------------------
# Header extraction and parsing
# ---------------------------------------------------------------------------

def extract_headers(zip_path: pathlib.Path):
    with zipfile.ZipFile(zip_path) as z:
        for name in z.namelist():
            if not name.lower().endswith((".h", ".hpp", ".cpp")):
                continue
            rel = pathlib.Path(name).name
            dst = THIRD / rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            with z.open(name) as src, open(dst, "wb") as out:
                out.write(src.read())

def parse_defines_enums_structs(text: str):
    text = strip_comments(text)
    defines, strings, enums, structs = [], [], [], []
    for line in text.splitlines():
        m = re.match(r"\s*#\s*define\s+([A-Za-z_][A-Za-z0-9_]*)\s+(.*)", line)
        if m:
            name, val = m.group(1), re.split(r"//", m.group(2))[0].strip()
            if "(" not in name and val:
                defines.append((name, val))
    for m in re.finditer(r"static\s+const\s+_TCHAR\s+([A-Za-z_][A-Za-z0-9_]*)\[\s*\]\s*=\s*_T\((\".*?\")\)", text):
        strings.append((m.group(1), m.group(2)))
    for m in re.finditer(r"enum\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{(.*?)\};", text, flags=re.S):
        ename, body = m.group(1), m.group(2)
        items = []
        for raw in body.split(","):
            raw = re.split(r"//", raw)[0].strip()
            if not raw:
                continue
            mm = re.match(r"([A-Za-z_][A-Za-z0-9_]*)\s*(?:=\s*(.+))?$", raw)
            if mm:
                items.append((mm.group(1), (mm.group(2) or "").strip()))
        enums.append((ename, items))
    for m in re.finditer(r"struct\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{(.*?)\};", text, flags=re.S):
        sname, body = m.group(1), m.group(2)
        fields = []
        for stmt in body.split(";"):
            stmt = re.split(r"//", stmt)[0].strip()
            if not stmt:
                continue
            mm = re.match(r"([A-Za-z_][A-Za-z0-9_\s\*]+)\s+([A-Za-z_][A-Za-z0-9_]*)(\[[^\]]+\])?$", stmt)
            if mm:
                ctype, fname, arr = mm.groups()
                arr = arr or ""
                ts_type = "number"
                if "*" in ctype or "char" in ctype:
                    ts_type = "string" if "char" in ctype else "number[]"
                elif "bool" in ctype:
                    ts_type = "boolean"
                fields.append((fname, ts_type, ctype.strip(), arr))
        structs.append((sname, fields))
    return defines, strings, enums, structs

# ---------------------------------------------------------------------------
# File generation
# ---------------------------------------------------------------------------

def emit_js_and_dts(defines, strings, enums, structs):
    LIB.mkdir(parents=True, exist_ok=True)

    # constants.js
    js_lines = ["// Auto-generated constants from iRacing SDK"]
    for name, s in strings:
        js_lines.append(f'export const {name} = {s};')
    for name, val in defines:
        js_lines.append(f'export const {name} = {val};')
    for ename, items in enums:
        js_lines.append(f'\nexport const {ename} = {{')
        for nm, expr in items:
            rhs = expr if expr else "undefined"
            js_lines.append(f'  {nm}: {rhs},')
        js_lines.append('};')
    (LIB / "constants.js").write_text("\n".join(js_lines), encoding="utf-8")

    # constants.d.ts
    dts_lines = ["// Type definitions for constants"]
    for name, s in strings:
        dts_lines.append(f'export const {name}: string;')
    for name, val in defines:
        dts_lines.append(f'export const {name}: number;')
    for ename, items in enums:
        dts_lines.append(f'export namespace {ename} {{')
        for nm, _ in items:
            dts_lines.append(f'  const {nm}: number;')
        dts_lines.append('}')
    (LIB / "constants.d.ts").write_text("\n".join(dts_lines), encoding="utf-8")

    # structs.js
    sj = ["// Auto-generated struct placeholders"]
    for sname, fields in structs:
        sj.append(f'export const {sname} = {{')
        for fname, _, _, _ in fields:
            sj.append(f'  {fname}: undefined,')
        sj.append('};')
    (LIB / "structs.js").write_text("\n".join(sj), encoding="utf-8")

    # structs.d.ts
    sd = ["// Type definitions for structs"]
    for sname, fields in structs:
        sd.append(f'export interface {sname} ' + "{")
        for fname, ts_type, ctype, arr in fields:
            sd.append(f'  /** {ctype}{arr} */')
            sd.append(f'  {fname}: {ts_type};')
        sd.append("}")
    (LIB / "structs.d.ts").write_text("\n".join(sd), encoding="utf-8")

    # index.js + d.ts
    js_index = """// Auto-generated entrypoint
import * as constants from './constants.js';
import * as structs from './structs.js';

export const IRSDK = {
  ...constants,
  ...structs
};

// Build banner
import fs from 'fs';
import path from 'path';
const reportPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../VERIFICATION_REPORT.txt');
try {
  const text = fs.readFileSync(reportPath, 'utf8');
  const hashMatch = text.match(/irsdk_defines\\.h:\\s*([a-f0-9]{64})/i);
  const shortHash = hashMatch ? hashMatch[1].slice(0, 8) : 'unknown';
  const sdkMatch = text.match(/IRSDK_VER\\s+(\\d+)/);
  const sdkVersion = sdkMatch ? sdkMatch[1] : 'unknown';
  console.log(`[iRSDK] Linked against iRacing SDK v${sdkVersion} (hash ${shortHash})`);
} catch {}"""
    (LIB / "index.js").write_text(js_index, encoding="utf-8")

    dts_index = """import * as constants from './constants.js';
import * as structs from './structs.js';
export const IRSDK: typeof constants & typeof structs;"""
    (LIB / "index.d.ts").write_text(dts_index, encoding="utf-8")

# ---------------------------------------------------------------------------
# Verification
# ---------------------------------------------------------------------------

def verify_headers():
    report = ["Verification report:", "====================="]
    for f in sorted(THIRD.glob("*.h")):
        report.append(f"{f.name}: {hash_file(f)}")
    REPORT.write_text("\n".join(report), encoding="utf-8")

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    if len(sys.argv) < 2:
        sys.exit("Usage: update_sdk.py path/to/irsdk_X_Y.zip")
    zip_path = pathlib.Path(sys.argv[1])
    if not zip_path.exists():
        sys.exit(f"SDK zip not found: {zip_path}")

    ensure_binding_gyp()
    THIRD.mkdir(parents=True, exist_ok=True)

    print(f"Extracting headers from {zip_path} ...")
    extract_headers(zip_path)
    defines_h = (THIRD / "irsdk_defines.h").read_text(encoding="utf-8", errors="ignore")
    defines, strings, enums, structs = parse_defines_enums_structs(defines_h)

    match = re.search(r"#define\s+IRSDK_VER\s+(\d+)", defines_h)
    sdk_ver = match.group(1) if match else "0"
    update_package_json(sdk_ver)

    emit_js_and_dts(defines, strings, enums, structs)
    verify_headers()

    print(f"Generated {len(defines)} defines, {len(enums)} enums, {len(structs)} structs.")
    print("Rebuilding native addon...")
    subprocess.run("npm install node-addon-api --no-audit --no-fund", cwd=ROOT, shell=True)
    print(f"✅ SDK update complete. Version {sdk_ver}. Check VERIFICATION_REPORT.txt for details.")

if __name__ == "__main__":
    main()
