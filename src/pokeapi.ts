export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static readonly locationAreaURL = "/location-area/";
    private static readonly locationURL = (id: string | number): string => `/location/${id}`;

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL !== undefined ? pageURL : PokeAPI.baseURL + PokeAPI.locationAreaURL;
        const response = await fetch(url);
        return await response.json();
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