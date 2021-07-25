'use strict';

import express from 'express';
import { sendMessengerMessage } from '../../../utils/graphFacebookUtils';
import { getResponseMessageBasedOnStatus, getUserIdAndMessageFromRequest, isEventFromPageSubscription } from '../../WebhookUtils';
import { processMessengerRequest } from '../services/MessengerWebookService';
export let router = express.Router();

router
    .get('/', (req, res) => {
        // Your verify token. Should be a random string.
        let VERIFY_TOKEN = "1212"

        // Parse the query params
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];

        // Checks if a token and mode is in the query string of the request
        if (mode && token) {

            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {

                // Responds with the challenge token from the request
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);

            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403);
            }
        }
    })
    .post('/', async (req, res) => {
        let body = req.body;

        if (isEventFromPageSubscription(body)) {
            const { userId, message, error } = getUserIdAndMessageFromRequest(body);

            if (error !== null || !userId || !message.text) {
                return res.status(404).send(error);
            }
            
            const result = await processMessengerRequest(message.text);

            const responseStatus = await sendMessengerMessage(userId, result.error ? result.error : result.result);
            res.status(responseStatus).send(getResponseMessageBasedOnStatus(responseStatus));
        } else {
            res.sendStatus(404);
        }
    });


