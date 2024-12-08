const db = require('../db/database');

async function showPrinter(){
    try {
        let results = await db.execute(`select * from printers`);
        return results.rows;
    }
    catch(e){
        throw e;
    }
}

async function getPrinter(printerId){
    try {
        let results = await db.execute(`select * from printers where printer_id = ?`, [printerId]);
        return results.rows;
    }
    catch(e){
        throw e;
    }
}

async function usageByMonth(num_months) {
    try {
        let results = await db.execute(`call usage_by_month(?)`, [num_months]);
        return results.rows;
    }
    catch(e){
        throw e;
    }
}

async function printerUsage(printerId){  
    try {
        let results = await db.execute(`call printerUsage(?)`, [printerId]);
        return results.rows;
    }
    catch(e){
        throw e;
    }
}

async function printerUsageByMonth(printerId, num_months){
    try {
        let results = await db.execute(`call totalUsageByMonth(?,?)`, [printerId, num_months]);
        return results.rows;
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
    printerUsageByMonth
};