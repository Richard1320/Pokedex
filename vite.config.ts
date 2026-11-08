import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // Keep CRA's output directory so the Dockerfile copy step is unchanged
    outDir: 'build',
  },
});
