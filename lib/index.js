// Auto-generated entrypoint
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
  const hashMatch = text.match(/irsdk_defines\.h:\s*([a-f0-9]{64})/i);
  const shortHash = hashMatch ? hashMatch[1].slice(0, 8) : 'unknown';
  const sdkMatch = text.match(/IRSDK_VER\s+(\d+)/);
  const sdkVersion = sdkMatch ? sdkMatch[1] : 'unknown';
  console.log(`[iRSDK] Linked against iRacing SDK v${sdkVersion} (hash ${shortHash})`);
} catch {}