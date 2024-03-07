const express = require('express');
const path = require('path');
const api = require('./routes/index');

// sets up port to be used if none choosen use 3001
const PORT = process.env.PORT || 3001;

// setting up middleware
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// set static page as public folder
app.use(express.static('public'));

// designating route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// designating route for /notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// designating wildcard route to go back to homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// setting up app to listen on given port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);