import path from 'node:path';
import fs from 'node:fs';
import { sync as resolveSync } from 'resolve';
import { findUp } from '@yukiakai/find-up';

export const resolvePath = (pkgName: string, basedir?: string): string | null => {
  try {
    const pkgFilePath = resolveSync(pkgName, { basedir });
    return pkgFilePath
      ? findUp('package.json', {
          basedir: path.dirname(pkgFilePath),
          matcher: (file) => {
            const json = JSON.parse(fs.readFileSync(file).toString());
            if (json.name) return true;
          },
        }) || null
      : null;
  } catch {
    return null;
  }
};
export const resolveMetadata = (
  pkgName: string,
  basedir?: string,
): Record<string, string | null | number | object | object[]> | null => {
  const pkgPath = resolvePath(pkgName, basedir);
  if (!pkgPath) return null;
  try {
    return JSON.parse(fs.readFileSync(path.join(pkgPath, 'package.json')).toString());
  } catch {
    return null;
  }
};
