const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');
const spsoController = require('../controllers/SPSOController');

router.get(
    '/id/:id',
    //authenticate,
    spsoController.getSPSOById
)

router.get(
    '/name/:name',
    //authenticate,
    spsoController.getSPSOByName
)

module.exports = router;