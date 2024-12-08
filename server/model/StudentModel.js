const db = require('../db/database');

async function getBalance(studentId) {
    try {
        let result = await db.execute('SELECT paper_balance FROM students WHERE student_id = ?', [studentId]);
        return result[0].paper_balance;
    } 
    catch (error) {
        throw error;
    }
}

async function minusBalance(studentId, amount) {
    try {
        const balance = await getBalance(studentId);
        if(balance < amount) {
            return {
                status: "Fail",
                message: "Not enough balance"
            };
        }
        amount = balance - amount;
        const [result,_] = await db.execute('UPDATE students SET paper_balance =  ? WHERE student_id = ?', [amount, studentId]);
        return {
            status: "Success"
        } ;
    } 
    catch (error) {
        throw error;
    }
}

async function getStudentById(studentId){
    try {
        let result = await db.execute('SELECT * FROM students WHERE student_id = ?', [studentId]);
        return result[0];
    } 
    catch (error) {
        throw error;
    }
}    

async function getStudentByEmail(studentEmail){
    try {
        let result = await db.execute('SELECT * FROM students WHERE student_email = ?', [studentEmail]);
        return result[0];
    } 
    catch (error) {
        throw error;
    }
}

async function getStudentOrderById(studentId) {
    try {
        let result = await db.execute('SELECT * FROM print_orders WHERE student_id = ?', [studentId]);
        return result
    }
    catch (error) {
        throw error;
    }
}
module.exports = {
    getBalance,
    minusBalance,
    getStudentByEmail,
    getStudentById,
    getStudentOrderById
};