const notesApi = require('express').Router();
const fs = require('fs');


notesApi.get('/api/notes.js', (req, res) =>{
    fs.readFile('Develop/db/db.json', 'utf-8', (error, data) => error ? console.error(error) : console.log(data))});

notesApi.post('/api/notes.js', (req, res) => {
  
    const {title, text} = req.body
    console.log(req.body);

    if (title && text) {
        const newNote = {
            title,
            text,
        };
            fs.writeFile ('log.txt', (err) => 
                err ? console.error(err) : console.log('Success!')
            )
    }


    res.json(`${req.method} note added.`)
});


module.exports = notesApi;