import { JokeCommand } from '../JokeCommand';
import {getRandomJoke} from '../../../../JokeApi';

jest.mock('../../../../JokeApi', () => ({
    getRandomJoke: jest.fn().mockReturnValue(Promise.resolve({ type: "single", joke: "joke" }))
}))

test('getRandomJoke returned Joke with single type, returns joke string', async () => {
    const jokeCommand = new JokeCommand();
    await jokeCommand.processCommand().then(result => expect(result).toBe('joke'));
})
