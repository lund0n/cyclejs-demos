/* eslint-disable strict,import/no-extraneous-dependencies */
'use strict';
const Cylon = require('cylon');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackEnv = { dev: true };
const webpackConfig = require('./webpack.config')(webpackEnv);

const app = express();
const server = http.createServer(app);
const SPHERO_PORT = '/dev/tty.Sphero-OBG-AMP-SPP'; // TODO put your sphero connection here

app.use(webpackDevMiddleware(webpack(webpackConfig)));
const io = socketIO(server);
const controller = Cylon.robot({
  connections: {
    sphero: { adaptor: 'sphero', port: SPHERO_PORT },
  },

  devices: {
    sphero: { driver: 'sphero' },
  },

  work(my) {
    io.on('connection', (socket) => {
      socket.on('color', color => {
        console.log('color!', color);
        my.sphero.color(color);
      });
      my.sphero.on('collision', () => {
        console.log('Bang!');
        io.emit('collision', 'bang!');
      });
    });
    my.sphero.detectCollisions();
  },
});
server.listen(3000, () => {
  controller.start();
});
