const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');
const spsoController = require('../controllers/SPSOController');

router.get(
    '/id/:spsoId',
    authenticate,
    spsoController.getSPSOById
)

router.get(
    '/name/:spsoName',
    authenticate,
    spsoController.getSPSOByName
)

module.exports = router;