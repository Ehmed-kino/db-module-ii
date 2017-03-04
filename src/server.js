'use strict';

const PORT = 8000;

const express = require('express');
const db = require('sqlite');
const organisationsRoutes = require('./routes/organisations');
const app = express();

app.get('/organisations', organisationsRoutes.get);
app.post('/organisations', organisationsRoutes.add);
app.put('/organisations/:id', organisationsRoutes.update);
app['delete']('/organisations/:id', organisationsRoutes.remove);

const initialiseApp = db.open('data/database.sqlite', { Promise })
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
        return app;
    });

module.exports = initialiseApp;