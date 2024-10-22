const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

const port = 5000

dotenv.config()

let spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
let spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let spotify_redirect_uri = process.env.REDIRECT_URI;
let spotify_auth_url = process.env.SPOTIFY_AUTHORIZE_ENDPOINT;
let scope = 'user-read-playback-state';

var app = express();
app.use(cors()); 

app.get('/auth/login', (req, res) => {
  let url = spotify_auth_url;
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(spotify_client_id)
  url += '&scope=' + encodeURIComponent(scope)
  url += '&redirect_uri=' + encodeURIComponent(spotify_redirect_uri)

  res.redirect(url);
 
});

app.get('/auth/callback', (req, res) => {
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})