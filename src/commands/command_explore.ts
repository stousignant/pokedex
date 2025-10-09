import type { State} from "../state.js";

export async function commandExplore(state: State, location: string): Promise<void> {
    const locationAreaData = await state.pokeapi.fetchLocation(location);
    console.log(`Exploring ${locationAreaData.name}...`);
    
    if (locationAreaData.pokemon_encounters.length > 0) {
        console.log("Found Pokemon:");
    }
    else {
        console.log("No Pokemon found.");
    }

    for (const pokemonEncounter of locationAreaData.pokemon_encounters) {
        console.log(` - ${pokemonEncounter.pokemonUrl.name}`);
    }
}