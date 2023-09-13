const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('index', { title: 'My Express App', message: 'Hello' });
});

module.exports = router;
