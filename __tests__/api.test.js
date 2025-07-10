import module from 'node:module';
import { describe, it, expect } from 'vitest';
import * as core from '../src/index.js';
import * as esm from '@yukiakai/resolve-package';
const require = module.createRequire(import.meta.url);
const cjs = require('@yukiakai/resolve-package');

describe.each([
  ['Core', core],
  ['ESM', esm],
  ['CJS', cjs],
])('resolve-package with (%s)', (name, lib) => {
  it('resolvePath should return root folder of a package', () => {
    const path = lib.resolvePath('resolve');
    expect(path).toBeTypeOf('string');
    expect(path).toMatch(/node_modules/);
    expect(path.endsWith('resolve')).toBe(true); // may vary if using pnpm
  });

  it('resolveMetadata should return package.json contents', () => {
    const meta = lib.resolveMetadata('resolve');
    expect(meta).toBeTypeOf('object');
    expect(meta.name).toBe('resolve');
    expect(meta.version).toMatch(/[0-9.]+/);
  });

  it('should return null for non-existent package', () => {
    const path = lib.resolvePath('this-package-does-not-exist');
    const meta = lib.resolveMetadata('this-package-does-not-exist');
    expect(path).toBe(null);
    expect(meta).toBe(null);
  });
});
