'use strict';
const config = require('../hls-authorization');
const requestIp = require('request-ip');
const fs = require('fs');
const path = require('path');
const MD5 = require("crypto-js/md5");

module.exports = (state) => {
    var playlistRoutes = require('express-promise-router')();

    function checkFolder() {
        const ls = fs.readdirSync(config.hls_path);
        const results = ls.filter((item) => {
            return path.extname(item).toLowerCase() === '.m3u8'
        }).map((e, index) => {
            return {
                "id": index,
                "title": e.toLowerCase(),
            }
        });
        return results
    }

    playlistRoutes.get('/streams', (req, res) => {
        let auth_key = req.query.auth;
        res.setHeader('Access-Control-Allow-Origin', config.ACAO);

        if (auth_key === state.get('auth_key')) {
        console.log(`${new Date().toISOString()} :: Lineup requested by `
            + requestIp.getClientIp(req));
        res.status(200).send(checkFolder());
    }
});

    playlistRoutes.get('/request', async (req, res) => {
        const streams = checkFolder();
        let auth_key = req.query.auth;
        let hashClient = req.query.hash;
        let hashServer = MD5(requestIp.getClientIp(req)).toString();
        res.setHeader('Access-Control-Allow-Origin', config.ACAO);
        res.setHeader('Content-type', 'application/x-mpegURL');
        if (auth_key === state.get('auth_key') &&
            hashClient.toLowerCase() === hashServer.toLowerCase()) {
            let id = req.query.id;
            let path = config.hls_path.toString() +
                streams[id].title.toString();
            res.status(200).send(fs.readFileSync(path));
        }
    });

    return playlistRoutes;
};