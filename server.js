'use strict';

import fs from 'fs';
import path from 'path';
import {join} from 'path';
import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import {config} from 'server/config/config';
import passport from 'passport';
const requireAuth = require('server/middleware/passport');
import services from 'server/services';
import bodyParser from 'body-parser';
import cors from 'cors';

const models = join(__dirname, 'server/models');
const port = process.env.PORT || 1337;
const app = express();

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.indexOf('.js'))
    .forEach(file => require(join(models, file)));


app.use('/static/', express.static('static'));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const auth = passport.authenticate('jwt', {session: false});

app.get('/api/intern', auth, function (req, res) {
    res.send({hi: 'there'});
});

// require('server/routes/index')(app);
services(app);

app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen() {
    console.log(`Server listen: http://localhost:${port}`);
    app.listen(port);
}

function connect() {
    const options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.Promise = global.Promise;
    return mongoose.connect(config.db, options).connection;
}

module.exports = app;
