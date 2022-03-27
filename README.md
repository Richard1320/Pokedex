## Setup

1. Download https://github.com/PokeAPI/api-data. Copy `PokeAPI/api-data/data/` directory
   to `pokedex/public/assets/data/`.
2. Download https://github.com/PokeAPI/sprites. Copy `PokeAPI/sprites/sprites/`
   to `pokedex/public/assets/images/sprites/`.

## Digital Ocean Traefic

1. `docker build -t pokedex/website --file ./Dockerfile .`
2. `docker-compose -f ./docker-compose.yml up -d`
