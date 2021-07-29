'use strict'
import { createCommand } from './CommandFactory';
import { getCommandFromMessage, isCommandInMessage } from './MessengerCommandService'

export const processMessengerRequest = async(messageText: string): Promise<MessageRequestResponse> => {
     if (!isCommandInMessage(messageText)) {
        return getMessageRequestResponseError("Potrzebuje #<komenda> zeby wykonać Twoje polecenie :(");
     }

     const commandText = getCommandFromMessage(messageText);
     if (commandText === "") {
        return getMessageRequestResponseError("Oops, nie znam tej komendy :o");
     }
     
     const command = createCommand(commandText);
     const messageResult = await command.processCommand()

     return getMessageRequestResponse(messageResult);
}

const getMessageRequestResponse = (result: string) => {
    return {
        status: 200,
        result: result,
    }
}

const getMessageRequestResponseError = (error: string) => {
    return {
        status: 404,
        result: "error",
        error: error
    }
}

export interface MessageRequestResponse {
    status: number,
    result: string,
    error?: string
}