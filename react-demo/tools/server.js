import express from 'express';
import cors from 'cors';
import log from 'log';

// const allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// };

import fs from 'fs';
import path from 'path';

const app = express();

// app.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

const buildPath = __dirname + '/../build';
const dataPath = __dirname + '/../src/mock/data';

/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 ************************************************************/

// Serve application file depending on environment
app.get('/app.js', (req, res) => {
    if (process.env.PRODUCTION) {
        res.sendFile('app.js', {root: buildPath});
    } else {
        res.redirect('//localhost:9090/build/app.js');
    }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
    if (process.env.PRODUCTION) {
        res.sendFile('style.css', {root: buildPath});
    } else {
        res.redirect('//localhost:9090/build/style.css');
    }
});

// Serve all mock data
app.get('/api/:jsonFile', cors(), (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.sendFile(request.params.jsonFile, {root: dataPath});
});

app.post('/api/*', (request, response) => {
    log.info(request.header);
    log.info(request.body);
    response.status = 201;
});

// Serve index page
app.get('*', (req, res) => {
    res.sendFile('index.html', {root: buildPath});
});


/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');
    const config = require('./webpack.local.config');

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        noInfo: true,
        historyApiFallback: true
    }).listen(9090, 'localhost', (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}


/******************
 *
 * Express server
 *
 *****************/

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});
