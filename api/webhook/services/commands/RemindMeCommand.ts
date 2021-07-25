'use strict'

import { Command } from "./Command";

export class RemindMeCommand extends Command {
    async processCommand(): Promise<string> {
        return "RemindMeLOl";
    }
}