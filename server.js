'use strict';

import fs from 'fs';
import {join} from 'path';
import express from 'express';
import mongoose from 'mongoose';
import config from 'server/config/config';
import authCheckMiddleware from 'server/middleware/auth-check';
import services from 'server/services';

const models = join(__dirname, 'server/models');
const port = process.env.PORT || 1337;
const app = express();

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.indexOf('.js'))
    .forEach(file => require(join(models, file)));


app.use('/api', authCheckMiddleware);

// require('server/routes/index')(app);
services(app);

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
    return mongoose.connect(config.db, options).connection;
}

module.exports = app;
