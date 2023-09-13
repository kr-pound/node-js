// Express Module
const express = require('express');
const app = express();

// Downloaded Module
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

// Custom Middleware
const log = require('./logger');
const authenticate = require('./authenticator');

// 3-rd Party Middleware
const helmet = require('helmet');
const morgan = require('morgan');

// Router
const courses = require('./routes/courses');
const home = require('./routes/home');

// Template Engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Custom Middleware
app.use(log);
app.use(authenticate);

// 3-rd Party Middleware
app.use(helmet());
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}
dbDebugger('Connected to the database...');

// Router
app.use('/', home);
app.use('/api/courses', courses);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
