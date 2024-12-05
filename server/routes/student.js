const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');
const studentController = require('../controllers/StudentController');

router.get(
    '/id/:studentId',
    authenticate,
    studentController.getStudentDetail
)

router.get(
    '/email/:studentEmail',
    authenticate,
    studentController.getStudentDetailByEmail
)

router.get(
    'id/:studentId/order',
    authenticate,
    studentController.getStudentOrderWithId
)

module.exports = router;