const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');
const orderController = require('../controllers/OrderController');
const printerController = require('../controllers/PrinterController');
const studentController = require('../controllers/StudentController');
const DocumentController = require('../controllers/DocumentController');


// localhost:5000/api/print/1/confirm
/*
{
    'printerId': 1,
    'file' : {
        name: 'file.pdf',
        size: 1000,
        type: 'pdf'
    }
}
*/

router.get(
    '/validate',
    //authenticate,
    orderController.validateFileType
);

router.post(
    '/:id/confirm',
    //authenticate,
    orderController.addOrder
);

router.put(
    '/:id/updateBalance',
    //authenticate,
    studentController.updateStudentBalance
);

router.get(
    '/showPrinter',
    //authenticate,
    printerController.getPrinters
);


module.exports = router;