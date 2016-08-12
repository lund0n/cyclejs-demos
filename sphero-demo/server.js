/* eslint-disable strict */
'use strict';
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const sphero = require('sphero');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackEnv = { dev: true };
const webpackConfig = require('./webpack.config')(webpackEnv);

const port = '/dev/cu.Sphero-OBG-AMP-SPP';
const orb = sphero(port);

const app = express();
const server = http.createServer(app);

app.use(webpackDevMiddleware(webpack(webpackConfig)));

orb.connect().then(orb.detectCollisions)
      .then(() => {
        const io = socketIO(server);
        io.on('connection', (socket) => {
          socket.on('color', color => {
            console.log('color!', color);
            orb.color(color);
          });
          orb.on('collision', () => {
            console.log('Bang!');
            io.emit('collision', 'bang!');
          });
        });
      });
server.listen(3000);
