"use strict";

const express = require('express');

class Server {

    constructor(config, logger, finder) {
        this.config = config;
        this.logger = logger;
        this.finder = finder;
        this.setRoutes();
    }

    /**
     * Defines routes
     */
    setRoutes() {
        this.app = express();
        this.app.get('/', (req, res) => {
            this.logger.info('client connected');
            res.sendStatus(200);
        });
        this.app.get('/find/:lyrics', this.findLyricsRoute.bind(this));
    }

    /**
     * Route handler for /find path
     * @param req
     * @param res
     */
    findLyricsRoute(req, res) {
        let lyrics = req.params.lyrics;
        res.setHeader('Access-Control-Allow-Origin', '*');
        if(!lyrics) {
            res.status(400).send('Lyrics must be valid');
            this.logger.error('Lyrics not valid');
            return;
        }

        this.finder.getTracks(lyrics)
            .then(tracks => {
                if(tracks) {
                    res.send(tracks);
                    this.logger.info('Tracks found ' + tracks);
                }
            })
            .catch(err => {
                res.send(err);
                this.logger.error(err);
            });
    }

    /**
     * Set up server to listen on the specified port
     */
    start() {
        this.server = this.app.listen(this.config.server.port, () => {
            this.logger.info('Server started on port ' + this.config.server.port);
        });
    }

    /**
     * Closes the server connection
     */
    shutdown() {
        this.server.close();
    }

}

module.exports = Server;