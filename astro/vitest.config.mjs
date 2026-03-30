import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.{js,mjs,ts}'],
    exclude: ['tests/**', 'node_modules/**'],
  },
});
