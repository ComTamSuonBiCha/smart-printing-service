const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');
const orderController = require('../controllers/OrderController');
const printerController = require('../controllers/PrinterController');
const studentController = require('../controllers/StudentController');
const DocumentController = require('../controllers/DocumentController');

router.get(
    '/validate',
    //authenticate,
    orderController.validateFileType
);

router.post(
    '/confirm',
    //authenticate,
    orderController.addOrder
);

router.put(
    'updateBalance',
    //authenticate,
    studentController.updateStudentBalance
);

router.get(
    '/showPrinter',
    //authenticate,
    printerController.getPrinters
);


module.exports = router;