const express = require('express');
const user = require('./user');
const history = require('./history');

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('OK');
}
);

module.exports = router;