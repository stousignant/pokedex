import { commandCatch } from "./commands/command_catch.js";
import { commandExit } from "./commands/command_exit.js";
import { commandExplore } from "./commands/command_explore.js";
import { commandHelp } from "./commands/command_help.js";
import { commandMap } from "./commands/command_map.js";
import { commandMapb } from "./commands/command_mapb.js";
import type { CLICommand } from "./command.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays the next 20 locations",
            callback: commandMap,  
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 locations",
            callback: commandMapb,  
        },
        explore: {
            name: "explore",
            description: "Lists all the Pokemon in a given area",
            callback: commandExplore,  
        },
        catch: {
            name: "catch",
            description: "Adds Pokemon to user's pokedex",
            callback: commandCatch,  
        },
    };
}