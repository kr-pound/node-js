// Express Module
const express = require('express');
const app = express();

// Router
const genres = require('./routes/genres');

// Middleware
app.use(express.json());

// Router
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));