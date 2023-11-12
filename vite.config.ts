/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    css: true,
    coverage: {
      enabled: true,
      all: true,
      include: ['src/components/**/*'],
      exclude: ['**/*.d.ts'],
      provider: 'v8',
      reporter: ['text'],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
});
