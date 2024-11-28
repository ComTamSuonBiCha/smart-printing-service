const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authenticate  = require('../middleware/authenticate');

router.get(
    '/', 
    authenticate, 
    userController.getUserById
);

router.post(
    '/login/student',
    userController.loginStudent
);

router.post(
    '/login/SPSO',
    userController.loginSPSO
);

module.exports = router;