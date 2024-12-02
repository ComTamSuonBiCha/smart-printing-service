const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const studentController = require('../controllers/StudentController');

router.get(
    '/id/:studentId',
    authenticate,
    studentController.getStudentDetail
)

router.get(
    '/email/:studentEmail',
    authenticate,
    studentController.getStudentByEmail
)

router.get(
    'id/:studentId/order',
    authenticate,
    studentController.getStudentOrderById
)

module.exports = router;