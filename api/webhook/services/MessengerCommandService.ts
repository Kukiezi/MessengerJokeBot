'use strict';
import { messengerCommand } from '../../../enums/MessengerCommands';

export const getCommandFromMessage = (message: string): string => {
    const index = message.indexOf("#");
    if (index === -1) {
        return "";
    }
    
    const substringOfMessageAfterHashTag = message.substring(index + 1);
    const indexOfFirstSpaceAfterHashTag = substringOfMessageAfterHashTag.indexOf(" ");

    if (indexOfFirstSpaceAfterHashTag === -1) {
        return doesCommandMatchExistingCommands(substringOfMessageAfterHashTag) ? substringOfMessageAfterHashTag : "";
    }
    const substringOfMessageBetweenHashTagAndSpace = substringOfMessageAfterHashTag.substring(0, indexOfFirstSpaceAfterHashTag);
    return doesCommandMatchExistingCommands(substringOfMessageBetweenHashTagAndSpace) ? substringOfMessageBetweenHashTagAndSpace : "";
}

export const isCommandInMessage = (message: string): boolean => {
    if (message.indexOf("#") !== -1) {
        return true;
    }
    return false;
}

const doesCommandMatchExistingCommands = (command: string) => {
    if (!(Object.values(messengerCommand).includes(command))) {
        return false;
    }
    return true;
}