const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(body);
}

module.exports = {
    Genre,
    validateGenre
};
