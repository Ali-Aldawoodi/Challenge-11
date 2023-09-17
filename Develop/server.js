// GIVEN a note-taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// This is already done.


// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// Server.js file that connects to the notes page via routes

// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
//


// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column


// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

const express = require('express');
const path = require('path');
const api = require('./routes/index')

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);
const fs = require('fs')

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/notes.html'))

    // fs.readFile('notes.html')
);



app.post('/api/notes', (req, res) => 
    res.json(`${req.method} note added.`)
);

app.get('/api/notes', (req, res) =>
    res.send('/db/db.json')
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);