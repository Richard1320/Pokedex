/**
 * GET a URL and parse the body as JSON.
 * Like axios, rejects on non-2xx responses instead of resolving with an error page.
 */
export async function fetchJSON<T = any>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}: ${url}`);
    }
    return response.json() as Promise<T>;
}
