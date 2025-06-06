import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { fileURLToPath } from "node:url";
import {
  dirname,
  resolve,
} from "node:path";
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = `${__dirname}/package.json`;
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

const dependencies = Object.keys(packageJson.dependencies || {});
const peerDependencies = Object.keys(packageJson.peerDependencies || {});
const external = [...dependencies, ...peerDependencies];

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: resolve(__dirname, 'dist'),
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    typescript({tsconfig: './tsconfig.json'}),
  ],
  external: [...external, 'node:path'],
});
