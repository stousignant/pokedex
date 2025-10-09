import { State } from "./state";

// todo :: unsure if can be not async?
export async function commandExit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();
    process.exit(0);
}