'use strict'

import { Command } from "./Command";

export class InstructionCommand extends Command {
    async processCommand(): Promise<string> {
        return `I answer to commands, which start with #. Here are commands I work with: \n\n#joke - I will get you a random joke!`;
    }
}