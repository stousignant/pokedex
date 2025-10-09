import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static readonly locationAreaURL = (offset: number = 0, limit: number = 20): string => `/location-area/?offset=${offset}&limit=${limit}`;
    private static readonly locationURL = (id: string | number): string => `/location/${id}`;
    private readonly cacheInterval = 30000;

    #pokeCache: Cache;

    constructor() {
        this.#pokeCache = new Cache(this.cacheInterval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL !== undefined ? pageURL : PokeAPI.baseURL + PokeAPI.locationAreaURL();
        const cacheData = this.#pokeCache.get<ShallowLocations>(url);
        if (cacheData === undefined) {
            const response = await fetch(url);
            const jsonData = await response.json();
            this.#pokeCache.add(url, jsonData);
            return jsonData;
        } else {
            console.log(`Cache data used for url ${url}`);
            return cacheData;
        }        
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const response = await fetch(PokeAPI.baseURL + PokeAPI.locationURL(locationName));
        return await response.json();
    }

}

export type ShallowLocations = {
    count: number,
    next: string,
    previous: string,
    results: Array<Location>,
};

export type Location = {
    name: string,
    url: string,
};