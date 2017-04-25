"use strict";

const http = require('http');

class Finder {

    constructor(config) {
        this.config = config;
    }

    getTracks(lyrics) {
        return new Promise((resolve, reject) => {
            if(!lyrics) {
                return reject(new Error('lyrics parameter must be valid'));
            }

            //get tracks from Go service
            this.getTracksFromAPI(lyrics)
                .then(tracks => {
                    return resolve(tracks);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    getTracksFromAPI(lyrics) {
        return new Promise((resolve, reject) => {
            let path = this.config.finderAPI.url + '/find?q=' + lyrics;
            let request = http.get(path, res => {
                let data = [];
                res.on('data', chunks => {
                    data.push(chunks);
                });
                res.on('end', () => {
                    let buffer = Buffer.concat(data);
                    return resolve(buffer.toString());
                });
            });
            request.on('error', err => {
                return reject(err);
            });
        });
    }

}

module.exports = Finder;
