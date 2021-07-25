import {getCommandFromMessage} from '../MessengerCommandService';

test('gets command from the message', () => {
    expect(getCommandFromMessage('#joke siema')).toBe('joke');
});

test('return empty string if no # in message', () => {
    expect(getCommandFromMessage('joke siema')).toBe('');
});

test('return empty string if no matching command in message', () => {
    expect(getCommandFromMessage('#notexistingcommand')).toBe('');
})