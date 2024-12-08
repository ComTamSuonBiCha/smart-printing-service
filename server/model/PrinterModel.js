const { getPrinters } = require('../controllers/PrinterController');
const db = require('../db/database');

async function showPrinter(){
    try {
        let results = await db.execute(`select * from printers`);
        return results[0];
    }
    catch(e){
        throw e;
    }
}

async function getPrinter(printerId){
    try {
        let results = await db.execute(`select * from printers where printer_id = ?`, [printerId]);
        return results[0];
    }
    catch(e){
        throw e;
    }
}

async function usageByMonth(num_months) {
    try {
        let results = await db.execute(`call usage_by_month(?)`, [num_months]);
        return results[0][0];
    }
    catch(e){
        throw e;
    }
}

async function printerUsage(printerId){  
    try {
        let results = await db.execute(`call printerUsage(?)`, [printerId]);
        return results[0][0];
    }
    catch(e){
        throw e;
    }
}

async function printerUsageByMonth(printerId, num_months){
    try {
        let results = await db.execute(`call totalUsageByMonth(?,?)`, [printerId, num_months]);
        return results[0][0];
    }
    catch(e){
        throw e;
    }
}

async function updatePrinter(printerId, status){
    try {
        let [results,_] = await db.execute(`update printers set printer_status = ? where printer_id = ?`, [status, printerId]);
        return {
            status: "Success"
        }
    }
    catch(e){
        throw e;
    }
}

async function getPrintersInfo(){
    try {
        let results = await db.execute(`call printer_info()`);
        return results[0][0];
    }
    catch(e) {
        throw e;
    }
}

async function printerUsageByOrder(printerId) {
    try {
        let results = await db.execute(`call printer_use_by(?)`, [printerId]);
        return results[0][0];
    }
    catch(e){
        throw e;
    }
}
module.exports = {
    showPrinter,
    getPrinter,
    usageByMonth,
    printerUsage,
    printerUsageByMonth,
    updatePrinter,
    getPrintersInfo,
    printerUsageByOrder
};