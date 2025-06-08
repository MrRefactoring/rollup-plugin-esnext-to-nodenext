# Changelog

## [1.0.1] - Cosmetic Improvement - 2025-06-08

### 💄 Cosmetic Improvements
- Code style improvements and minor refactoring (thanks @tritiumTino)
- Updated project documentation (README.md) (thanks @tritiumTino)
- Updated dependencies to their latest versions

## [1.0.0] - Initial Release - 2025-05-09

### 🚀 Features

- **Initial implementation** of `rollup-plugin-esnext-to-nodenext`
- Automatic transformation of ESM imports to Node.js-compatible format:
  - Converts `import { x } from "./file"` to `import { x } from "./file.js"`
- Full TypeScript support
- Automatic output directory detection from Rollup config

### ⚙️ Configuration Options

- `verbose`: Enable detailed logging (default: `false`)
- `outputDir`: Manually specify output directory (optional)
