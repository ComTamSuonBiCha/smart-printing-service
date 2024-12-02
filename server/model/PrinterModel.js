const db = require('../db/database');

async function showPrinter(){
    try {
        let results = await db.query(`select * from printer`);
        return results.rows;
    }
    catch(e){
        throw e;
    }
}

async function getPrinter(printerId){
    try {
        let results = await db.query(`select * from printer where printer_id = $1`, [printerId]);
        return results.rows;
    }
    catch(e){
        throw e;
    }
}

async function usageByMonth(num_months) {
    try {
        let results = await db.query(`call usage_by_month($1)`, [num_months]);
        return results.rows;
    }
    catch(e){
        throw e;
    }
}

async function printerUsage(printerId){  
    try {
        let results = await db.query(`call printerUsage($1)`, [printerId]);
        return results.rows;
    }
    catch(e){
        throw e;
    }
}

async function printerUsageByMonth(printerId, num_months){
    try {
        let results = await db.query(`call totalUsageByMonth($1, $2)`, [printerId, num_months]);
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