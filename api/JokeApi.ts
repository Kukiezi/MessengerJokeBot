'use strict';

import fetch from 'node-fetch';

export const getRandomJoke = async(): Promise<JokeResponse> => {
    return await fetch("https://v2.jokeapi.dev/joke/Any?lang=en")
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<JokeResponse>;
        });
}

interface JokeResponse {
  "error"?: boolean,
  "category"?: string,
  "type": string,
  "setup"?: string,
  "delivery"?: string,
  "joke"?: string,
  "flags"?: {
    "nsfw": boolean,
    "religious": boolean,
    "political": boolean,
    "racist": boolean,
    "sexist": boolean,
    "explicit": boolean
  },
  "id"?: number,
  "safe"?: boolean,
  "lang"?: string
}