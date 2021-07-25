import fetch from 'node-fetch';



export const sendMessengerMessage = async (userId: string, messageText: string): Promise<number> => {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
    const SEND_MESSAGE_API_URL = process.env.SEND_MESSAGE_API_URL;
    let responseStatus;

    await fetch(
        `${SEND_MESSAGE_API_URL}${PAGE_ACCESS_TOKEN}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                messaging_type: 'RESPONSE',
                recipient: {
                    id: userId,
                },
                message: {
                    text: messageText,
                },
            }),
        }
    )
        .then(response => { responseStatus = response.status})
        .catch(error => console.log("error: " + error));

    if (!responseStatus) {
        return 404;
    }
    return responseStatus;
}