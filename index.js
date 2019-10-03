const express = require("express");
const https = require('https');
const fs = require('fs');
const bodyParser = require("body-parser");
const state = require('./state/state');
const config = require('./hls-authorization');

const playlistRoutes = require('./routes/playlist');
const ipRoutes = require('./routes/ip');

(async () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    state.set('auth_key',config.auth_key);
    state.set('hls_path', config.hls_path);
    state.set('key_path', config.key_path);
    state.set('ssl_key', config.ssl_key);
    state.set('ssl_cert', config.ssl_cert);
    state.set('ssl_ca', config.ssl_ca);
    state.set('port', config.port);

    app.use('/api/v1/playlist/', playlistRoutes(state));
    app.use('/api/v1/ip/', ipRoutes(state));

    const port = parseInt(state.get('port'));
    https.createServer({
        key: fs.readFileSync(state.get("ssl_key")),
        cert: fs.readFileSync(state.get("ssl_cert")),
        ca: fs.readFileSync(state.get("ssl_ca"))
    },app).listen(port, () => {
        console.log();
        console.log(`\x1b[32m┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
        console.log(`┃ ${new Date().toISOString()} :: Server started on port: ${port} ┃`);
        console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\x1b[0m`);
    });
})();
