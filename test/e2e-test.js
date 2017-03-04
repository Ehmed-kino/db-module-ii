'use strict';

const { expect } = require('chai');
const request = require('supertest');
const fs = require('fs');
const server = require('../server');

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
        it('should list every organisation and its associated data', function () {
            return request(server)
                .get('/organisations')
                .expect(200)
                .then(response => {
                    expect(response.body.length).to.equal(3);

                    expect(response.body).to.deep.equal([
                        {
                            id: 1,
                            name: 'Amnesty International',
                            address: '17-25 New Inn Yard',
                            city: 'London',
                            postCode: 'EC2A 3EA',
                            telephone: '020 7033 1500',

                            services: [
                                'Immigration',
                                'Discrimination'
                            ],

                            contacts: [
                                {
                                    name: 'Joe Bloggs',
                                    email: 'joe@bloggs.com'
                                },

                                {
                                    name: 'John Doe',
                                    email: 'johndoe@email.com'
                                }
                            ]
                        },

                        {
                            id: 2,
                            name: 'Refugee Council',
                            address: 'PO Box 68614',
                            city: 'London',
                            postCode: 'E15 9DQ',
                            telephone: '020 7346 6700',

                            services: [
                                'Immigration',
                                'Discrimination',
                                'Housing',
                                'Employment'
                            ],

                            contacts: [
                                {
                                    name: 'Ola Nordmann',
                                    email: 'ola@email.com'
                                }
                            ]
                        },

                        {
                            id: 3,
                            name: 'Refugee Action',
                            address: '11 Belgrave Road',
                            city: 'London',
                            postCode: 'SW1V 1RB',
                            telephone: '0207 952 1511',

                            services: [
                                'Immigration',
                                'Discrimination',
                                'Housing',
                                'Employment'
                            ],

                            contacts: [
                                {
                                    name: 'Greg Fred',
                                    email: 'greg@fred.com'
                                }
                            ]
                        }
                    ]);
                });
        });
    });
});