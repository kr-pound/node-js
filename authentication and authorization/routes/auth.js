const express = require('express');
const router = express.Router();

// Downloaded Module
const Joi = require('joi');
const bcrypt = require('bcrypt');

// Model
const { User } = require('../models/user');

function validateUser(body) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(body);
}

router.post('/', async(req, res) => {

    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const user_check = await User.findOne({ email: req.body.email });
    if (!user_check)
        return res.status(400).send('Invalid email or password');

    const isValid = await bcrypt.compare(req.body.password, user_check.password);
    if (!isValid)
        return res.status(400).send('Invalid email or password');

    const token = user_check.generateAuthToken();
    res.send(token);
});

module.exports = router;
