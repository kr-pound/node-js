const express = require('express');
const router = express.Router();

// Model
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async(req, res) => {

    const movies = await Movie
        .find()
        .sort('name');

    res.send(movies);
});

router.post('/', async(req, res) => {

    const { error } = validateMovie(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send('Invalid Genre');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    const result = await movie.save()
    res.send(result);
});

router.put('/:id', async(req, res) => {

    const { error } = validateMovie(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send('Invalid Genre');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }
    }, { new: true });

    if (!movie)
        return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.delete('/:id', async(req, res) => {

    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie)
        return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.get('/:id', async(req, res) => {

    const movie = await Movie.findById(req.params.id);
    if (!movie)
        return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

module.exports = router;
