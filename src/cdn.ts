/**
 * PokeAPI data and sprites are served from a CDN rather than bundled or hosted.
 * Defaults to jsDelivr's mirror of the upstream PokeAPI GitHub repos; override
 * with VITE_DATA_URL / VITE_SPRITES_URL (no trailing slash) at build time.
 */
export const DATA_URL: string =
    import.meta.env.VITE_DATA_URL ?? 'https://cdn.jsdelivr.net/gh/PokeAPI/api-data@master/data';

export const SPRITES_URL: string =
    import.meta.env.VITE_SPRITES_URL ?? 'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites';

/** Sprite URLs embedded in the PokeAPI data point at raw GitHub; rewrite them to SPRITES_URL. */
export function cdnSprite(url: string): string {
    return url.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites', SPRITES_URL);
}
