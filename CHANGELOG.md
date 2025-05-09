# Changelog

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
