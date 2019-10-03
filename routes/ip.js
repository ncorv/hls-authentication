'use strict';
const requestIp = require('request-ip');
const config = require('../hls-authorization');

module.exports = (state) => {
    var ipRoutes = require('express-promise-router')();

    ipRoutes.get('/request', async (req, res) => {
        let auth_key = req.query.auth;
        res.setHeader('Access-Control-Allow-Origin', config.ACAO);
        if (auth_key === state.get('auth_key')) {
            res.status(200).send(requestIp.getClientIp(req));
        }
    });
    return ipRoutes;
};