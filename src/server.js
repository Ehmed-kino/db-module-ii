'use strict';

const PORT = 8000;

const express = require('express');
const app = express();

const organisationsRoutes = require('routes/organisations');

app.get('/organisations', organisationsRoutes.get);
app.post('/organisations', organisationsRoutes.add);
app.put('/organisations/:id', organisationsRoutes.update);
app.del('/organisations/:id', organisationsRoutes.remove);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));