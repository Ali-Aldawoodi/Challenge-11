const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const notesApi = express.Router();

notesApi.use(express.json());

notesApi.get('/notes', (req, res) =>
    fs.readFile('./db/db.json', 'utf-8', (error, data) => error ? console.error(error) : res.json(JSON.parse(data))));



notesApi.post('/notes', (req, res) => {

    const { title, text } = req.body
    console.log(req.body);

    if (title && text) {

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {

            if (err) {
                console.error(err);
                res.status(500).send('Server Error');
            } else {
                const parsedNotesArr = JSON.parse(data); // This worked because this has to be an array for json to read it??
                const newNote = {
                    title,
                    text,
                    newNoteID: uuidv4(),
                };

                parsedNotesArr.push(newNote);

                // const updatedNotes = JSON.stringify(parsedNotesArr);

                // I want to add the new note to the end of the array but when we press save i want to reset the form. 
                // make db.json an array.
                console.log(notesApi)

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


module.exports = notesApi;


// watch out for data structure
// In order to fix it, you need to
// • Read the current notes from the database
// • JSON.parse it
// • Add the new notes to the array
// • JSON.stringify it
// • Write the notes to the database

// Currently you only write the new note, which writes over the old one