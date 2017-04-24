"use strict";

const config = require('./config');
const Logger = require('./logger');
const FinderAPI = require('./finder_api');
const Server = require('./server');

let logger = new Logger(config);
let finderAPI = new FinderAPI(config);
let server = new Server(config, logger, finderAPI);

server.start();

module.exports = function disconnect() {
    server.shutdown();
};