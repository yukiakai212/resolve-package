# @yukiakai/resolve-package

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

[![Build Status][github-build-url]][github-url]
[![codecov][codecov-image]][codecov-url]

> 🔍 Reliable way to get the root directory or metadata of a Node.js package — even with `pnpm`!

**`@yukiakai/resolve-package`** helps you find the actual root directory of any installed package in your project (where its `package.json` is located), and even read that `package.json` — regardless of whether you use **npm**, **yarn**, or **pnpm** (including with symlinks and virtual stores).

---

## 🚀 Why?

Most existing solutions like `require.resolve`, `pkg-dir`, or `resolve` only give you the **entry file** path — not the actual root directory of the package.  
In modern `pnpm` setups, they often fail or give incorrect results due to symlinks and virtual folders.

This library solves it by resolving the entry file, then walking up the directory tree to find the real `package.json`.

---

## 📦 Installation

```bash
npm install @yukiakai/resolve-package
# or
pnpm add @yukiakai/resolve-package
# or
yarn add @yukiakai/resolve-package
```

---

## 🔧 Usage

### ESM / TypeScript

```ts
import { resolvePath, resolveMetadata } from '@yukiakai/resolve-package';

const rootPath = resolvePath('lodash');
const meta = resolveMetadata('lodash');

console.log(rootPath);
// → /absolute/path/to/node_modules/.pnpm/lodash@4.17.21/node_modules/lodash

console.log(meta.name, meta.version);
// → lodash 4.17.21
```

### CommonJS

```js
const { resolvePath, resolveMetadata } = require('@yukiakai/resolve-package');

console.log(resolvePath('express'));
console.log(resolveMetadata('express'));
```

---

## 🧩 API

### `resolvePath(pkgName: string, basedir?: string): string | null`

- Returns absolute path to the root folder of the given package (where its `package.json` is).
- Returns `null` if the package cannot be resolved.

### `resolveMetadata(pkgName: string, basedir?: string): object | null`

- Returns parsed contents of the package's `package.json`
- Returns `null` if not found or invalid

---

## ✅ Features

- Works with **pnpm**, **npm**, and **yarn**
- Handles **symlinks**, **hoisted**, and **virtual stores**
- No assumptions about project layout

---

## 📂 Example output (with `pnpm`):

```js
resolvePath('vite');
// → /home/user/project/node_modules/.pnpm/vite@5.1.0/node_modules/vite

resolveMetadata('vite');
// → { name: 'vite', version: '5.1.0', ... }
```

---

## 🧪 Run Tests

```bash
npm run test
```

Uses [Vitest](https://vitest.dev/).

---

## ❓ FAQ

**Q: Why not just use `require.resolve()`?**  
A: It only gives you the main file (`some/folder/index.js`, etc.), not the folder containing `package.json`. Also, it doesn't work correctly with ESM modules.

**Q: Does it work with workspaces / monorepos?**  
A: Yes. It uses `resolve` under the hood, and always finds the correct installed location.

---

## 📦 Changelog

See full release notes in [CHANGELOG.md][changelog-url]

---

## 📄 License

MIT © 2025 [Yuki Akai](https://github.com/yukiakai212/)

---

[npm-downloads-image]: https://badgen.net/npm/dm/@yukiakai/resolve-package
[npm-downloads-url]: https://www.npmjs.com/package/@yukiakai/resolve-package
[npm-url]: https://www.npmjs.com/package/@yukiakai/resolve-package
[npm-version-image]: https://badgen.net/npm/v/@yukiakai/resolve-package
[github-build-url]: https://github.com/yukiakai212/resolve-package/actions/workflows/build.yml/badge.svg
[github-url]: https://github.com/yukiakai212/resolve-package/
[codecov-image]: https://codecov.io/gh/yukiakai212/resolve-package/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/yukiakai212/resolve-package
[changelog-url]: https://github.com/yukiakai212/resolve-package/blob/main/CHANGELOG.md

