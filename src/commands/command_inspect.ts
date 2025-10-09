import type { State } from "../state.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void> {
    if (pokemonName in state.pokedex) {
        const pokemon = state.pokedex[pokemonName];
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
    } else {
        console.log("you have not caught that pokemon");
    }
}