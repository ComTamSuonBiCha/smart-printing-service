const express = require('express');
const student = require('./student');
const spso = require('./spso');
const order = require('./order');
const user = require('./user');
const printer = require('./printer');
const document = require('./document');

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('OK');
}
);

router.use('/student', student);
router.use('/spso', spso);
router.use('/order', order);
router.use('/user', user);
router.use('/printer', printer);    
router.use('/document', document);

module.exports = router;