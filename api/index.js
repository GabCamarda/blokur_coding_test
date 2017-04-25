"use strict";

const config = require('./config/index');
const Logger = require('./logger/index');
const FinderAPI = require('./finder_api/index');
const Server = require('./server/index');

let logger = new Logger(config);
let finderAPI = new FinderAPI(config);
let server = new Server(config, logger, finderAPI);

server.start();

module.exports = function disconnect() {
    server.shutdown();
};