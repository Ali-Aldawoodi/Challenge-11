const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const notesApi = express.Router();

notesApi.use(express.json());

notesApi.get('/notes', (req, res) =>
    fs.readFile('./db/db.json', 'utf-8', (error, data) => error ? console.error(error) : res.json(JSON.parse(data))));



notesApi.post('/notes', (req, res) => {

    const { title, text } = req.body

    if (title && text) {

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {

            if (err) {
                console.error(err);
                res.status(500).send('Server Error');
            } else {
                const parsedNotesArr = JSON.parse(data);
                const newNote = {
                    title,
                    text,
                    newNoteID: uuidv4(),
                };
                parsedNotesArr.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotesArr), (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Failed');
                    } else {
                        const response = {
                            status: 'success',
                            body: newNote,
                        };
                        console.log(response);
                        res.status(201).json(response);
                    }
                });
            };
        });
    } else {
        res.status(400).send('Bad Request');
    }
});

// Dislaying the note from the left column to the right has to do with the note id. I would bascially say something like when this note id is clicked bring the note back up on the right side. 

module.exports = notesApi;
