const {showPrinter,getPrinter,usageByMonth,printerUsage,printerUsageByMonth, updatePrinter} = require('../model/PrinterModel');

async function getPrinters(req, res, next) {
    try {
        let results = await showPrinter();
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

async function choosePrinter(req, res, next) {
    try {
        let printerId = req.params.id;
        let results = await getPrinter(printerId);
        res.json(results);
    }
    catch(e){
        next(e);
    }
}


async function updatePrinterController(req, res, next) {
    try {
        let printerId = req.params.id;
        let status = req.body.printer_status;
        let results = await updatePrinter(printerId, status);
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

async function getPrinterStat(req, res, next) { // for all printers
    try {
        let no_months = req.params.months;
        let results = await usageByMonth(no_months);
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

async  function getPrinterUsage(req, res, next) { // 
    try {
        let printerId = req.params.id;
        let results = await printerUsage(printerId);
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

async function getPrinterUsageByMonth(req, res, next) {
    try {
        let printerId = req.params.id;
        let num_months = req.params.months;
        let results = await printerUsageByMonth(printerId, num_months);
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

module.exports = {
    getPrinters,
    choosePrinter,
    updatePrinterController,
    getPrinterStat,
    getPrinterUsage,
    getPrinterUsageByMonth
};