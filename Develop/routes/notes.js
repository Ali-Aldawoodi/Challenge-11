const notesApi = require('express').Router();
const { response } = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


notesApi.get('/notes', (req, res) =>
    fs.readFile('./db/db.json', 'utf-8', (error, data) => error ? console.error(error) : res.json(JSON.parse(data))));



notesApi.post('/notes', (req, res) => {

    const { title, text } = req.body
    console.log(req.body);

    if (title && text) {
        const newNote = {
            title,
            text,
            newNoteID: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf-8', (error, data) => {

            if (err) {
                console.error(err);
            } else {
                const parsedNotesArr = JSON.parse(data);

                parsedNotesArr.push(newNote);


                // make db.json an array.
                console.log(notesApi)


                const newNoteJSON = JSON.stringify(newNote)

                fs.writeFile('./db/db.json', newNoteJSON, (err) =>
                    err ? console.error(err) : console.log('Success!')
                )
            }
        });
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