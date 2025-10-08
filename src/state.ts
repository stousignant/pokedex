import type { CLICommand } from "./command.js";
import { getCommands } from "./commands_registry.js";
import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    rl: Interface,
    commands: Record<string, CLICommand>,
    pokeapi: PokeAPI,
    nextLocationsURL?: string,
    prevLocationsURL?: string,
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        rl: rl,
        commands: getCommands(),
        pokeapi: new PokeAPI(),
    }
}