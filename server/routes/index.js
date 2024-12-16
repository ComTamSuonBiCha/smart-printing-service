const express = require('express');
const student = require('./student');
const spso = require('./spso');
const print = require('./print');
const user = require('./user');
const printer = require('./printer');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('OK');
}
);

router.use('/student', student);
router.use('/spso', spso);
router.use('/print', print);
router.use('/user', user);
router.use('/printer', printer);    

module.exports = router;