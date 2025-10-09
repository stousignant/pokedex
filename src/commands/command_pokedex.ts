import type { State } from "../state.js";

export async function commandPokedex(state: State): Promise<void> {
    if (Object.keys(state.pokedex).length == 0) {
        console.log("Your Pokedex is empty.");
        return;
    }

    console.log(`Your Pokedex:`);
    for (const key in state.pokedex) {
        console.log(` - ${state.pokedex[key].name}`);
    }
}