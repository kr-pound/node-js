const Joi = require('joi');
const mongoose = require('mongoose');

const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(body) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(body);
}

module.exports = {
    User,
    validateUser
};
