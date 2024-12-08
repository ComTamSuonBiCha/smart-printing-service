const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');
const studentController = require('../controllers/StudentController');

router.get(
    '/id/:id',
    //authenticate,
    studentController.getStudentDetail
)

router.get(
    '/email/:email',
    //authenticate,
    studentController.getStudentDetailByEmail
)

router.get(
    '/id/:id/order',
    //authenticate,
    studentController.getStudentOrderWithId
)

module.exports = router;