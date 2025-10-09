import { State } from "./state";

export async function commandMap(state: State): Promise<void> {
    const locationsData = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    for (const result of locationsData.results) {
        console.log(result.name);
    }

    state.nextLocationsURL = locationsData.next;
    state.prevLocationsURL = locationsData.previous;
}