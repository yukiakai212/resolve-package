import path from 'node:path';
import fs from 'node:fs';
import resolveSync from 'resolve/sync.js';
import { findUp } from '@yukiakai/find-up';

export const resolvePath = (pkgName, basedir) => {
  try {
    const pkgFilePath = resolveSync(pkgName, { basedir });
    return pkgFilePath ? findUp('package.json', { basedir: path.dirname(pkgFilePath) }) : null;
  } catch {
    return null;
  }
};
export const resolveMetadata = (pkgName, basedir) => {
  const pkgPath = resolvePath(pkgName, basedir);
  if (!pkgPath) return null;
  try {
    return JSON.parse(fs.readFileSync(path.join(pkgPath, 'package.json')));
  } catch {
    return null;
  }
};
