const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');
const printerController = require('../controllers/PrinterController');

router.get(
    '/id/:id',
    //authenticate,
    printerController.choosePrinter
)

router.get(
    '/',
    //authenticate,
    printerController.getPrinters
)

router.put(
    '/id/:id',
    //authenticate,
    printerController.updatePrinter
)

router.get(
    '/history/months/:months',
    //authenticate,
    printerController.getPrinterStat
)

router.get(
    '/history/id/:id',
    //authenticate,
    printerController.getPrinterUsage
)

router.get(
    '/history/id/:id/months/:months',
    //authenticate,
    printerController.getPrinterUsageByMonth
)

module.exports = router;
