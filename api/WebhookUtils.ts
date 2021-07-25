'use strict';

import { isNullish } from "../utils/isNullish";

export const isEventFromPageSubscription = (body: any): boolean => {
    return body.object === 'page';
}

export const getResponseMessageBasedOnStatus = (status: number): string => {
    switch (status) {
        case 200:
            return "Message was sent succesfully via graph";
        case 404: 
            return "Something went wrong when sending request to graph Facebook";
        default: 
            return "";
    }
}

export const getUserIdAndMessageFromRequest = (body: any): UserMessage => {
        let userId;
        let messageText;

        body.entry.forEach((entry: any) => {
            entry.messaging.forEach((event: any) => {
                if (event.message && event.message.text) {
                    messageText = event.message.text;
                    userId = event.sender.id;
                }
            });

        });
        if (isNullish(userId) || isNullish(messageText) || !userId || !messageText) {
            return _getErrorUserMessageResponse();
        }
        return _getUserMessageType(userId, messageText);
}

const _getErrorUserMessageResponse = (): UserMessage => {
    return {
        'userId': null,
        'message': {
            'text': null,
        },
        'error': 'userId or messageText is null.'
    }
}

const _getUserMessageType = (userId: string, messageText: string): UserMessage => {
    return {
        'userId': userId,
        'message': {
            'text': messageText,
        },
        'error': null,
    }
}

interface UserMessage {
    userId: string | null,
    message: {
        text: string | null,
    },
    error?: string | null,
}