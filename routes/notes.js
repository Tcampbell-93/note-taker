const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils.js');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding new note');
    }
});

notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    console.log(noteId);
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const updatedData = json.filter((note) => note.id !== noteId);

            writeToFile('./db/db.json', updatedData)
            .then( () => {
                res.json(`Item ${noteId} has been deleted`)
            })
        });
});

module.exports = notes;