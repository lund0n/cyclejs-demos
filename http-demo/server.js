var jsonServer = require('json-server');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
var webpackEnv = { dev: true };
var webpackConfig = require('./webpack.config')(webpackEnv);

server.use(webpackDevMiddleware(webpack(webpackConfig)));
server.use(middlewares);
server.use(router);
server.listen(3000, function() {
  console.log('Running!');
});
