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
      include: ['src'],
      exclude: [
        'src/main.tsx',
        'src/app',
        'src/interfaces',
        'src/tests',
        '**/*.d.ts',
      ],
      provider: 'v8',
      reporter: ['text'],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
    watch: false,
  },
});
