const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with the given ID was not found');

    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with the given ID was not found');

    courses.splice(courses.indexOf(course), 1);
    res.send(course);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
