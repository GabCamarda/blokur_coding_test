"use strict";

const mocha = require('mocha');
const expect = require('expect');
const http = require('http');
const config = require('../config/index');

//starts the app
const app = require('../index');

describe('Smoke test', () => {

    let baseUrl = 'http://localhost:' + config.server.port;

    it('should return 200', (done) => {
        http.get(baseUrl, res => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });

    it('should return tracks', (done) => {
        let testLyrics = 'sweet dreams are made of this';
        http.get(baseUrl + '/find/' + testLyrics, res => {
            let data = [];
            res.on('data', chunks => {
                data.push(chunks);
            });
            res.on('end', () => {
                let buffer = Buffer.concat(data);
                expect(buffer.toString()).toBeOk();
                done();
            });
        });
    });

});
