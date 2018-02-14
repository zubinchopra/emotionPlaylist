const express = require('express');
const app = express();
const request = require('request');
const path = require('path');

let PORT = process.env.PORT || 8080;

app.use((req, res, next) => {

    console.log(new Date().getTime(), req.url);

    next();

});

app.use(express.static(path.resolve(__dirname, '../public')));

let SPOTIFY_ID = 'e8d5a73140a745d3bc8b1e360bb300eb';
let SPOTIFY_SECRET = 'c4c6346fe6ea4079b2670fb2f3745b97';

app.get('/api/spotify', (req, res) => {

    let query = req.query.q;

    request.post({
        url: 'http://accounts.spotify.com/api/token',
        auth: {
            username: SPOTIFY_ID,
            password: SPOTIFY_SECRET,
            sendImmediately: true
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    },
    (authErr, authResponse, authJSON) => {
        request.get({
            url: 'https://api.spotify.com/v1/search?type=track&query=' + query,
            auth: {
                bearer: authJSON.access_token
            },
            json: true
        },
        (searchErr, searchResponse, searchBody) => {
            res.json(searchBody);
        }
    )});
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});