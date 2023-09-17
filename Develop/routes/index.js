const express = require('express');

const notesRouter = require('/Users/alial/bootcamp/Challenge-11/Develop/public/notes.html')

const app = express();

app.use('/notes', notesRouter);

module.exports = app;