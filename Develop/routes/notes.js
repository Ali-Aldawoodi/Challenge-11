const notesApi = require('express').Router();
const fs = require('fs');


notesApi.get('/notes', (req, res) =>
fs.readFile('./db/db.json', 'utf-8', (error, data) => error ? console.error(error) : console.log(data)))

notesApi.post('/notes', (req, res) => {
  
    const {title, text} = req.body
    console.log(req.body);

    if (title && text) {
        const newNote = {
            title,
            text,
        };
        // How do i tell the computer to write file to the index.js?
        // Index.js line 174 says we need to send file to db because the function there will render it to the sidebar
        // How do i get the computer to write file to the db, by using the newNote object??
        const newNoteJSON = JSON.stringify(newNote)
            fs.writeFile('./db/db.json', newNoteJSON, (err) => 
                err ? console.error(err) : console.log('Success!')
            )
    }


    res.json(`${req.method} note added.`)
});


module.exports = notesApi;