'use strict';
import { messengerCommand } from '../../../enums/MessengerCommands'; 
import {JokeCommand} from './commands/JokeCommand';
import {RemindMeCommand} from './commands/RemindMeCommand';

export const createCommand = (command: string) => {
    switch(command) {
        case messengerCommand.JOKE:
            return new JokeCommand();
        case messengerCommand.REMIND_ME:
            return new RemindMeCommand();
        default:
            return new JokeCommand();
    }
}