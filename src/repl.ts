import { createInterface } from 'node:readline';

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
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();
    rl.on("line", (input) => {
        if (input === "") {
            rl.prompt();
            return;
        }
        const cleanWords = cleanInput(input);
        console.log(`Your command was: ${cleanWords[0]}`);
        rl.prompt();
    });
}
