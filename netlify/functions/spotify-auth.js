// const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { code, redirectUri } = JSON.parse(event.body);

    const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: data.error }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong', details: error.message }),
        };
    }
};
