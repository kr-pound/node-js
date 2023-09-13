// Express Module
const express = require('express');
const router = express.Router();

// Downloaded Module
const Joi = require('joi');

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

router.get('/', (req, res) => {
    return res.send(courses);
});
router.get('/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with the given ID was not found');
    return res.send(course);
});

router.post('/', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    if (!req.body.name || req.body.name.length < 3)
        return res.status(400).send('Name is required and should be minimum 3 characters’');
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    return res.send(courses[courses.length - 1]);
});

router.put('/:id', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with the given ID was not found');

    course.name = req.body.name;
    return res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with the given ID was not found');

    res.send(courses.splice(courses.indexOf(course), 1)[0]);
});

module.exports = router;
