## Assets

PokeAPI data and sprites are loaded from a CDN, not bundled or hosted with the app.
By default they come from jsDelivr's mirror of the upstream PokeAPI repos
([api-data](https://github.com/PokeAPI/api-data), [sprites](https://github.com/PokeAPI/sprites)).
To use your own CDN (e.g. DigitalOcean Spaces), set these at build time (no trailing slash):

```
VITE_DATA_URL=https://cdn.jsdelivr.net/gh/PokeAPI/api-data@master/data
VITE_SPRITES_URL=https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites
```

## Development

- `npm run dev` — start the Vite dev server on http://localhost:3000
- `npm run build` — production build to `build/`
- `npm run preview` — serve the production build locally

## Digital Ocean Traefik

`docker compose -f ./docker-compose.yml up -d --build`
