'use strict';

const { expect } = require('chai');
const request = require('supertest');
const sqlite = require('sqlite');
const fs = require('fs');

describe('The organisations API', function () {
    beforeEach(function () {
        /* create copy of database for each test
         * for the sake of test independence */
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream('data/database.sqlite');
            const writeStream = fs.createWriteStream('test/database.tmp.sqlite');

            readStream.on('error', reject);
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);

            readStream.pipe(writeStream);
        });
    });

    after(function () {
        fs.unlink('test/database.tmp.sqlite');
    });

    describe('HTTP GET to /organisations', function () {

    });
});