import { tsAddJsExtension } from 'ts-add-js-extension';
import { dirname } from 'node:path';
import type { Plugin } from 'rollup';

export interface Options {
  /**
     * Explicit output directory (overrides Rollup config detection)
     */
  outputDir?: string;
  /**
     * Enable verbose logging (default: false)
     */
  verbose?: boolean;
}

/**
 * Rollup plugin that processes emitted files to enforce Node.js ESM resolution rules
 * by adding explicit file extensions to imports.
 */
export default function postprocessNodeNext(options: Options = {
  verbose: false,
}): Plugin {
  let outputDir: string;

  return {
    name: 'rollup-plugin-postprocess-nodenext',

    outputOptions(config) {
      if (options.outputDir) {
        outputDir = options.outputDir;
      } else if (config.dir || config.file) {
        outputDir = config.dir || dirname(config.file!);
      } else {
        throw new Error('Missing output directory configuration');
      }

      return null;
    },

    async writeBundle() {
      const result = await tsAddJsExtension({
        config: {
          dir: outputDir,
          showProgress: options.verbose,
        },
      });

      if (result.type === 'error') {
        throw result.error;
      }
    },
  };
}
