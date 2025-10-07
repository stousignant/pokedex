import { initState, type State } from "./state.js";

export function cleanInput(input: string): string[] {
    const words = input.trim().toLowerCase().split(" ");
    let cleanWords = [];
    for (const word of words) {
        if (word !== "") {
            cleanWords.push(word);
        }
    }

    return cleanWords;
}

export function startREPL() {
    const state: State = initState();
    state.rl.prompt();
    state.rl.on("line", (input) => {
        if (input === "") {
            state.rl.prompt();
            return;
        }
        
        const cleanWords = cleanInput(input);
        const firstWord = cleanWords[0];
        const command = state.commands[firstWord];
        if (command) {
            try {
                command.callback(state);
            } catch (error) {
                console.log(`error = ${error}`);
            }            
        } else {
            console.log("Unknown command");
        }
        
        state.rl.prompt();
    });
}
