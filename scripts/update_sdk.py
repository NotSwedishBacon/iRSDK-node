#!/usr/bin/env python3
"""
update_sdk.py — regenerates all Node bindings and metadata from an iRSDK ZIP.

Features:
  • Auto-detects iRSDK version from zip filename (e.g. irsdk_1_19.zip → 1.19.0)
  • Keeps package.json version synced with SDK version
  • Idempotently ensures binding.gyp is correct (include_dir fix, flags, etc.)
  • Skips npm rebuild when running under CI
  • Optionally bumps patch if version already exists on npm
"""

import os
import re
import json
import zipfile
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIB = ROOT / "lib"
THIRD_PARTY = ROOT / "third_party" / "irsdk"
PACKAGE_JSON = ROOT / "package.json"
BINDING_GYP = ROOT / "binding.gyp"


# -----------------------------------------------------------------------------
# Utility helpers
# -----------------------------------------------------------------------------
def derive_version_from_zip(zip_path: str) -> str:
    """Extract semantic version from zip filename."""
    m = re.search(r'(\d+)[._](\d+)(?:[._](\d+))?', zip_path)
    if not m:
        return "0.0.0"
    major, minor, patch = m.groups(default="0")
    return f"{major}.{minor}.{patch}"


def bump_if_exists(version: str, pkg_name: str = "iracing-node-sdk") -> str:
    """Check npm for existing version and bump patch if needed."""
    try:
        result = subprocess.run(
            ["npm", "view", pkg_name, "versions", "--json"],
            capture_output=True, text=True, check=True
        )
        versions = json.loads(result.stdout)
        if version in versions:
            parts = [int(x) for x in version.split(".")]
            parts[-1] += 1
            new_version = ".".join(map(str, parts))
            print(f"⚠️  Version {version} already published, bumped to {new_version}")
            return new_version
    except Exception:
        pass
    return version

import shutil

def extract_zip(zip_path: str, target_dir: Path):
    """Extracts the SDK zip into third_party/irsdk (cross-platform safe)."""
    if target_dir.exists():
        print(f"🧹 Cleaning old SDK directory: {target_dir}")
        shutil.rmtree(target_dir, ignore_errors=True)

    target_dir.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(zip_path) as z:
        z.extractall(target_dir)

    print(f"✅ Extracted {zip_path} → {target_dir}")



def ensure_binding_gyp(root: Path):
    """Ensure binding.gyp is consistent and includes all required paths."""
    desired = {
        "targets": [{
            "target_name": "irsdk",
            "sources": ["src/irsdk_bindings.cc"],
            "include_dirs": [
                "<!(node -p \"require('node-addon-api').include\")",
                "<!(node -p \"require('node-addon-api').include_dir\")",
                "third_party/irsdk"
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
            "libraries": []
        }]
    }
    gyp_path = root / "binding.gyp"
    if not gyp_path.exists():
        print("📘 Creating new binding.gyp")
        with open(gyp_path, "w", encoding="utf-8") as f:
            json.dump(desired, f, indent=2)
    else:
        with open(gyp_path, "r+", encoding="utf-8") as f:
            try:
                current = json.load(f)
            except json.JSONDecodeError:
                current = {}
            current["targets"] = desired["targets"]
            f.seek(0)
            json.dump(current, f, indent=2)
            f.truncate()
        print("🔧 Verified binding.gyp consistency.")


def update_package_json(version: str):
    """Update package.json with the given version."""
    if not PACKAGE_JSON.exists():
        raise FileNotFoundError("package.json not found")

    with open(PACKAGE_JSON, "r+", encoding="utf-8") as f:
        pkg = json.load(f)
        pkg["version"] = version
        f.seek(0)
        json.dump(pkg, f, indent=2)
        f.truncate()

    print(f"📦 Updated package.json → version {version}")


def npm_rebuild_if_local():
    """Rebuild locally if not running in CI."""
    if os.environ.get("CI", "").lower() == "true":
        print("🧩 CI environment detected, skipping npm rebuild.")
        return
    print("🔨 Rebuilding native addon locally...")
    subprocess.run(["npm", "rebuild"], cwd=ROOT, check=True, shell=True)


# -----------------------------------------------------------------------------
# Main process
# -----------------------------------------------------------------------------
def main():
    # find the latest irsdk_*.zip in the repo root
    zips = list(ROOT.glob("irsdk_*.zip"))
    if not zips:
        raise FileNotFoundError("No irsdk_*.zip found in project root.")
    zip_path = str(sorted(zips)[-1])
    print(f"📂 Using SDK archive: {zip_path}")

    # derive and adjust npm version
    raw_version = derive_version_from_zip(zip_path)
    npm_version = bump_if_exists(raw_version)
    print(f"📦 Detected SDK version {raw_version} → NPM version {npm_version}")

    # extract SDK
    extract_zip(zip_path, THIRD_PARTY)

    # verify binding.gyp
    ensure_binding_gyp(ROOT)

    # update package.json version
    update_package_json(npm_version)

    # optional rebuild (skipped in CI)
    npm_rebuild_if_local()

    print("✅ SDK update complete.")


if __name__ == "__main__":
    main()
