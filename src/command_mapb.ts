import { State } from "./state";

export async function commandMapb(state: State): Promise<void> {
    const locationsData = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    for (const result of locationsData.results) {
        console.log(result.name);
    }
    
    state.nextLocationsURL = locationsData.next;
    state.prevLocationsURL = locationsData.previous;
}