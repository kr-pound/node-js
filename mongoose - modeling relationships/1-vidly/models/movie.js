const mongoose = require('mongoose');
const Joi = require('joi');

// Schema
const { genreSchema } = require('./genre');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    }
});
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(body) {

    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(body);
}

module.exports = {
    Movie,
    validateMovie
};
