"use strict";

const config = {

    server: {
        port: process.env.PORT || 1337
    },

    logger: {
        consoleColours: {
            error: '\x1b[41m',
            warning: '\x1b[43m',
            info: '\x1b[42m',
            reset: '\x1b[0m'
        }
    }

};

module.exports = config;