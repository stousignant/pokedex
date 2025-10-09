import type { State } from "../state.js";

export async function commandCatch(state: State, pokemon: string | number): Promise<void> {
    const result = await state.pokeapi.fetchPokemon(pokemon);
    console.log(`Throwing a Pokeball at ${result.name}...`);
    const catchPercentage = determineCatchPercentage(result.base_experience);
    console.log(`where ${result.name} has ${result.base_experience} XP (catch% = ${catchPercentage})`);
    const catchRandomValue = Math.random();
    if (catchRandomValue <= catchPercentage) {
        console.log(`${result.name} was caught!`);
        state.pokedex[result.name] = result;        
    } else {
        console.log(`${result.name} escaped!`);
    }
}

function determineCatchPercentage(baseExperience: number): number {
    let catchDifficulty = 0;
    while (baseExperience > 10) {
        baseExperience = baseExperience / 2;
        catchDifficulty++;
    }

    const catchPercentage = Math.min(catchDifficulty * 0.1, 0.99);
    return 1 - catchPercentage;
}