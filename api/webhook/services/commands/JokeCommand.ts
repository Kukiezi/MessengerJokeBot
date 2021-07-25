'use strict'

import { getRandomJoke } from "../../../JokeApi";
import { Command } from "./Command";

export class JokeCommand extends Command {
    async processCommand(): Promise<string> {
        const response = await getRandomJoke();
        return response.type === "single" ? String(response.joke) : `${response.setup}\n.\n.\n${response.delivery}`;
    }
}