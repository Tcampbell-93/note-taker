const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');     // uuid to create id for notes
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils.js');      // importing helper functions

// get route for notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// post route for notes
notes.post('/', (req, res) => {
    console.log(req.body);

    // deconstruct the body of req
    const { title, text } = req.body;

    if(req.body) {
        // create body of new note including an individual id
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        // read the db.json and append the new note to it
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding new note');
    }
});

// delete route for notes
notes.delete('/:note_id', (req, res) => {
    // grab the note id from the params and store it as noteId
    const noteId = req.params.note_id;
    console.log(noteId);
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // filter out all the notes without the id of the one being deleted
            const updatedData = json.filter((note) => note.id !== noteId);

            // write the new list to the db.json file
            writeToFile('./db/db.json', updatedData)
            .then( () => {
                res.json(`Item ${noteId} has been deleted`)
            })
        });
});

module.exports = notes;