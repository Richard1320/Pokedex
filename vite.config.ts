import { defineConfig, type Connect, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import sirv from 'sirv';
import path from 'node:path';

// Large static assets (PokeAPI data + sprites) live outside the project so they
// are never copied into the build. In production nginx serves them from a mounted
// volume; in dev/preview this plugin serves them from ASSETS_DIR.
const ASSETS_DIR = path.resolve(process.env.ASSETS_DIR ?? '../pokedex-assets');

function externalAssets(): Plugin {
  const mount = (server: { middlewares: Connect.Server }) => {
    for (const dir of ['data', 'images']) {
      const serve = sirv(path.join(ASSETS_DIR, dir), { dev: true, etag: true });
      // Called without `next` so a missing file is a 404 instead of falling
      // through to the SPA's index.html (which axios would happily parse).
      server.middlewares.use(`/assets/${dir}`, (req, res) => serve(req, res));
    }
  };
  return {
    name: 'external-assets',
    configureServer: mount,
    configurePreviewServer: mount,
  };
}

export default defineConfig({
  plugins: [react(), externalAssets()],
  server: {
    port: 3000,
  },
  build: {
    // Keep CRA's output directory so the Dockerfile copy step is unchanged
    outDir: 'build',
  },
});
