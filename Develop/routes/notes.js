const notesApi = require('express').Router();
const fs = require('fs');


notesApi.get('/notes', (req, res) =>
fs.readFile('./db/db.json', 'utf-8', (error, data) => error ? console.error(error) : res.json(JSON.parse(data))));

notesApi.post('/notes', (req, res) => {
  
    const {title, text} = req.body
    console.log(req.body);

    if (title && text) {
        const newNote = {
            title,
            text,
        };
        
        const newNoteJSON = JSON.stringify(newNote)
        
            fs.writeFile('./db/db.json', newNoteJSON, (err) => 
                err ? console.error(err) : console.log('Success!')
            )
    }

});


module.exports = notesApi;