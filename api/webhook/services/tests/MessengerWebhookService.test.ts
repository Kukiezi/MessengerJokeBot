import {processMessengerRequest} from '../MessengerWebookService';

jest.mock('../../../JokeApi', () => ({
    getRandomJoke: jest.fn().mockReturnValue(Promise.resolve({type: "single", joke: "joke"}))
  }))

test('processes request and return no command found ', async () => {
    await processMessengerRequest("#notexistingcommand siema co tam").then(result => expect(result.error).toBe('Oops, nie znam tej komendy :o'));
    await processMessengerRequest("#notexistingcommand#notexi siema co tam").then(result => expect(result.error).toBe('Oops, nie znam tej komendy :o'));
    await processMessengerRequest("existingcommand siema co tam").then(result => expect(result.error).toBe('Potrzebuje #<komenda> zeby wykonać Twoje polecenie :('));
})

test('processes request and finds joke command', async () => {
    await processMessengerRequest("#joke siema co tam").then(result => expect(result.result).toBe('joke'));
    await processMessengerRequest("daj jakis joke kurde#joke").then(result => expect(result.result).toBe('joke'));
    await processMessengerRequest("#joke").then(result => expect(result.result).toBe('joke'));
})