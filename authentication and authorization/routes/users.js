const express = require('express');
const router = express.Router();

// Downloaded Module
const _ = require('lodash');
const bcrypt = require('bcrypt');

// Middleware
const auth = require('../middleware/auth');

// Model
const { User, validateUser } = require('../models/user');

router.post('/', async(req, res) => {

    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const user_check = await User.findOne({ email: req.body.email });
    if (user_check)
        return res.status(400).send('User already registered');

    const user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const result = await user.save()

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(result, ['_id', 'name', 'email']));
});

router.get('/me', auth, async(req, res) => {

    const user = await User
        .findById(req.user._id)
        .select({ password: false });

    if (!user)
        return res.status(400).send('Something went wrong');

    res.send(user);
});

module.exports = router;
