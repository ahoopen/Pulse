'use strict';

import fs from 'fs';
import {join} from 'path';
import express from 'express';
import mongoose from 'mongoose';
import config from './server/config/config';

const models = join(__dirname, 'server/model');
const port = process.env.PORT || 3000;
const app = express();

module.exports = app;

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.indexOf('.js'))
    .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./server/config/express')(app);
// services

require('./server/routes/index')(app);


connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen() {
    app.listen(port);
}

function connect() {
    const options = {server: {socketOptions: {keepAlive: 1}}};
    return mongoose.connect(config.db, options).connection;
}
