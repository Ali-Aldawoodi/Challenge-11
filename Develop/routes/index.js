const express = require('express');

const notesRouter = require('/public/notes.js')

const app = express();

app.use('/routes/notes.js', notesRouter);

module.exports = app;