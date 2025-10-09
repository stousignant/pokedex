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
    state.rl.on("line", async (input) => {
        if (input === "") {
            state.rl.prompt();
            return;
        }
        
        const cleanInputWords = cleanInput(input);
        const command = state.commands[cleanInputWords[0]];
        if (command) {
            try {
                if (cleanInputWords.length == 2) {
                    await command.callback(state, cleanInputWords[1]);
                } else {
                    await command.callback(state);
                }                
            } catch (error) {
                console.log(`error = ${error}`);
            }            
        } else {
            console.log("Unknown command");
        }
        
        state.rl.prompt();
    });
}
