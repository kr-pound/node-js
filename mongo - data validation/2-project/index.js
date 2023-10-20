// Express Module
const express = require('express');
const app = express();

// Downloaded Module
const mongoose = require('mongoose');

// Router
const genres = require('./routes/genres');
const customers = require('./routes/customers');

// Middleware
app.use(express.json());

// Router
app.use('/api/genres', genres);
app.use('/api/customers', customers);

// Connect to the Database...
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('Connected to MongoDB...'))
    .catch(err => console.error(err.message));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));