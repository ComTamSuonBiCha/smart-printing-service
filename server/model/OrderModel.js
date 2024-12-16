const db = require('../db/database');

async function insertOrder(documentId, studentId, printerId, order) {
    try {
        console.log(order);
        const results = await db.execute('INSERT INTO print_orders (student_id, `file_id`, printer_id, `time`, side, no_of_copies, pages_per_sheet, orientation, page_size, left_margin, right_margin, top_margin, bottom_margin, page_from, page_to) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
            [studentId, documentId, printerId, order.time, order.side, order.no_of_copies, order.pages_per_sheet, order.orientation, order.page_size, order.left_margin, order.right_margin,order.top_margin, order.bottom_margin, order.page_from, order.page_to]);
        return {
            status: "Success"
        }
    }
    catch (error) {
        throw error;
    }
}

async function getOrder(studentId){
    try {
        const result = await db.execute('select * from print_orders where student_id = ?', [studentId]);
    }
    catch (error) {
        throw error;
    }
}

async function getFileType(){
    try {
        const result = await db.execute('call get_file_type()'); // return a list of file types
        return result;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    insertOrder,
    getOrder,
    getFileType
};