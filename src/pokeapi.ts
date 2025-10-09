import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static readonly locationAreaShallowURL = (offset: number = 0, limit: number = 20): string => `/location-area/?offset=${offset}&limit=${limit}`;
    private static readonly locationAreaURL = (location: string | number): string => `/location-area/${location}`;
    private readonly cacheInterval = 30000;

    #pokeCache: Cache;

    constructor() {
        this.#pokeCache = new Cache(this.cacheInterval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL !== undefined ? pageURL : PokeAPI.baseURL + PokeAPI.locationAreaShallowURL();
        return this.#getData<ShallowLocations>(url);
    }

    async fetchLocation(location: string | number): Promise<LocationArea> {
        const url = PokeAPI.baseURL + PokeAPI.locationAreaURL(location);
        return this.#getData<LocationArea>(url); 
    }

    async #getData<T>(url: string): Promise<T> {
        const cacheData = this.#getCacheData<T>(url);
        if (cacheData !== undefined) {
            return cacheData;
        } else {
            const response = await fetch(url);
            const jsonData = await response.json();
            this.#pokeCache.add(url, jsonData);
            return jsonData;
        }
    }
    
    #getCacheData<T>(key: string): T | undefined {
        const cacheData = this.#pokeCache.get<T>(key);
        if (cacheData !== undefined) {
            console.log(`Cache data used for url ${key}`);
        }

        return cacheData;
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

export type LocationArea = {
    id: number,
    name: string,
    pokemon_encounters: PokemonEncounter[],
};

export type PokemonEncounter = {
    pokemon: Pokemon,
};

export type Pokemon = {
    name: string,
    url: string,
}