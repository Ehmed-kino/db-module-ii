'use strict';

const db = require('sqlite');

module.exports = {
    get(req, res) {
        res.status(404).json({ error: 'Not found' });
    },

    add(req, res) {
        res.status(404).json({ error: 'Not found' });
    },

    update(req, res) {
        res.status(404).json({ error: 'Not found' });
    },

    remove(req, res) {
        res.status(404).json({ error: 'Not found' });
    }
};