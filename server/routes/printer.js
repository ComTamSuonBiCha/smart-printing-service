const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const printerController = require('../controllers/PrinterController');

router.get(
    '/id/:printerId',
    authenticate,
    printerController.choosePrinter
)

router.get(
    '/',
    authenticate,
    printerController.getPrinters
)

router.put(
    '/id/:printerId',
    authenticate,
    printerController.updatePrinter
)

router.get(
    '/history/months/:months',
    authenticate,
    printerController.getPrinterStat
)

router.get(
    '/history/id/:printerId',
    authenticate,
    printerController.getPrinterUsage
)

router.get(
    '/history/id/:printerId/months/:months',
    authenticate,
    printerController.getPrinterUsageByMonth
)

module.exports = router;
