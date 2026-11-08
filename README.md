## Setup

Large static assets are kept **outside** the project so they are never copied into
the build or the Docker image. By default the app expects them in `../pokedex-assets`
(override with the `ASSETS_DIR` env var):

```
pokedex-assets/
├── data/              # PokeAPI/api-data/data/   → served at /assets/data/
└── images/
    └── sprites/       # PokeAPI/sprites/sprites/ → served at /assets/images/sprites/
```

1. Download https://github.com/PokeAPI/api-data. Copy `PokeAPI/api-data/data/`
   to `pokedex-assets/data/`.
2. Download https://github.com/PokeAPI/sprites. Copy `PokeAPI/sprites/sprites/`
   to `pokedex-assets/images/sprites/`.

## Development

- `npm run dev` — start the Vite dev server on http://localhost:3000
- `npm run build` — production build to `build/`
- `npm run preview` — serve the production build locally

Both `dev` and `preview` serve `/assets/data` and `/assets/images` from `ASSETS_DIR`.

## Digital Ocean Traefik

nginx serves the assets from a read-only volume mount. By default that is
`../pokedex-assets`, a sibling of the project directory (the same place `npm run dev`
reads from), resolved relative to `docker-compose.yml`. Set `POKEDEX_ASSETS_DIR` to
use a different path.

On the droplet, sync the assets next to the checked-out project. They only need
syncing when they change, not on every deploy:

```
rsync -a --delete ../pokedex-assets/ user@droplet:/path/to/pokedex-assets/
```

Then build and start:

`docker compose -f ./docker-compose.yml up -d --build`
