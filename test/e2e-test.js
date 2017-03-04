'use strict';

const { expect } = require('chai');
const request = require('supertest');
const fs = require('fs');
const initialiseApp = require('../src/server');

let server;

describe('The organisations API', function () {
    before(function () {
        return initialiseApp.then(app => server = app);
    });

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
        fs.unlinkSync('test/database.tmp.sqlite');
    });

    describe('HTTP GET to /organisations', function () {
        it('should list every organisation and its associated data', function () {
            return request(server)
                .get('/organisations')
                .expect(200)
                .expect('Content-Type', /json/)
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

    describe('HTTP POST to /organisations', function () {
        it('should create a new organisation', function () {
            return request(server)
                .post('/organisations')
                .field('name', 'Shelter')
                .field('address', '88 Old Street')
                .field('city', 'London')
                .field('postCode', 'EC1V 9HU')
                .field('telephone', '0344 515 2000')
                .field('services', '3,4')
                .field('contacts', '1,2')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(() => request.get('/organisations'))
                .then(response => {
                    expect(response.body.length).to.equal(4);

                    expect(response.body[3]).to.deep.equal({
                        id: 4,
                        name: 'Shelter',
                        address: '88 Old Street',
                        city: 'London',
                        postCode: 'EC1V 9HU',
                        telephone: '0344 515 2000',

                        services: [
                            'Housing',
                            'Employment'
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
                    });
                });
        });
    });

    describe('HTTP PUT to /organisations', function () {
        it('should update an organisation`s address, telephone, and postcode', function () {
            return request(server)
                .put('/organisations/1')
                .field('address', '90 Old Road')
                .field('city', 'Manchester')
                .field('postCode', 'M13 9HU')
                .field('telephone', '0344 515 3000')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(() => request.get('/organisations'))
                .then(response => {
                    expect(response.body.length).to.equal(3);

                    expect(response.body[0]).to.deep.equal({
                        id: 1,
                        name: 'Amnesty International',
                        address: '90 Old Road',
                        city: 'Manchester',
                        postCode: 'M13 9HU',
                        telephone: '0344 515 3000',

                        services: [
                            'Housing',
                            'Employment'
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
                    });
                });
        });
    });

    describe('HTTP DELETE to /organisations', function () {
        it('should delete an organisation', function () {
            return request(server)['delete']('/organisations/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(() => request.get('/organisations'))
                .then(response => {
                    expect(response.body.length).to.equal(2);

                    expect(response.body[0].name).to.equal('Refugee Council');
                });
        });
    });
});