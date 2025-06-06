<div align="center">
  <h1>Rollup Plugin ESNext to NodeNext</h1>
  <a href="https://www.npmjs.com/package/rollup-plugin-esnext-to-nodenext" target="_blank" rel="noopener noreferrer"><img alt="NPM version" src="https://img.shields.io/npm/v/rollup-plugin-esnext-to-nodenext.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/rollup-plugin-esnext-to-nodenext" target="_blank" rel="noopener noreferrer"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/rollup-plugin-esnext-to-nodenext.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/mrrefactoring/rollup-plugin-esnext-to-nodenext/blob/master/.github/workflows/build.yml" target="_blank" rel="noopener noreferrer"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/rollup-plugin-esnext-to-nodenext/.github/workflows/build.yml?branch=master&style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/rollup-plugin-esnext-to-nodenext/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/rollup-plugin-esnext-to-nodenext?color=green&style=flat-square"/></a>

<span>A Rollup plugin that transforms ESM imports to Node.js-compatible `nodenext` format by adding explicit file extensions.</span>
</div>

## Features

- Automatically adds `.js` extensions to relative imports
- Supports TypeScript and JavaScript files
- Works with Rollup's output directory structure
- Verbose logging option for debugging

## Installation

```bash
npm install rollup-plugin-esnext-to-nodenext --save-dev
```

```bash
yarn add rollup-plugin-esnext-to-nodenext -D
```

```bash
pnpm add rollup-plugin-esnext-to-nodenext -D
```

## Usage

```javascript
import esnextToNodeNext from 'rollup-plugin-esnext-to-nodenext';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    esnextToNodeNext({
      verbose: true,  // enable logging (optional)
    }),
  ],
});
```

## Options

| Option      | Type      | Default         | Description                          |
|-------------|-----------|-----------------|--------------------------------------|
| `verbose`   | `boolean` | `false`         | Enable detailed logging              |
| `outputDir` | `string`  | *auto-detected* | Explicit output directory (optional) |

## How It Works

The plugin:

1. Detects your Rollup output directory automatically
2. Processes all emitted files after bundling
3. Transforms import statements like `from "./file"` to `from "./file.js"`
4. Preserves all other bundling functionality

## Why Use This?

This plugin solves a specific compatibility problem when your project uses **TypeScript with `bundler` module resolution
** during development, but needs to output **Node.js-compatible ESM with `nodenext` resolution** (particularly important
for type declarations).

### Typical Use Case Example

Your `tsconfig.json` uses `bundler`-friendly settings:

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    // ← Development mode (no .js extensions needed)
    "outDir": "dist"
  }
}
```

But your output needs to work with Node.js ESM (`nodenext`):

```json
// package.json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      // ← Must be nodenext-compatible
      "import": "./dist/index.js"
    }
  }
}
```

The plugin bridges this gap by:

1. Taking Rollup's bundled output (no extensions)
2. Transforming imports to be Node.js ESM-compliant:
   ```diff
   - import { foo } from './utils';
   + import { foo } from './utils.js';
   ```
3. Ensuring type declarations work in strict `nodenext` environments

### When You Need This

1. **Publishing libraries** with dual ESM/TypeScript support
2. **Building CLI tools** that need strict Node.js ESM compliance
3. **Generating type declarations** that must work in `nodenext` projects
4. **Migrating codebases** from bundler-friendly to Node-native ESM

Without this transformation, you'll see Node.js errors like:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module './utils' imported from...
Did you mean to import ./utils.js?
```

## License

MIT © Vladislav Tupikin
