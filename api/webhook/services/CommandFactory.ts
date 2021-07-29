'use strict';
import { messengerCommand } from '../../../enums/MessengerCommands'; 
import {JokeCommand} from './commands/JokeCommand';
import {InstructionCommand} from './commands/InstructionCommand';

export const createCommand = (command: string) => {
    switch(command) {
        case messengerCommand.INSTRUCTION:
            return new InstructionCommand();
        case messengerCommand.JOKE:
            return new JokeCommand();
        default:
            return new JokeCommand();
    }
}