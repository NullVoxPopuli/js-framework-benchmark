import fs from 'node:fs';

import { precompile } from '@glimmer/compiler';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [benchmark()],
});

function benchmark() {
  return {
    name: '@glimmer/benchmark',
    load(id) {
      /** @type {string | undefined} */
      let result;
      if (id.endsWith('.hbs')) {
        const source = fs.readFileSync(id, 'utf8');
        const compiled = precompile(source);
        result = `export default ${compiled};`;
      }
      return result;
    },
  };
}
