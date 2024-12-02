const db = require('../db/database');

async function getBalance(studentId) {
    try {
        let result = await db.query('SELECT paper_balance FROM student WHERE student_id = ?', [studentId]);
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
        const [result,_] = await db.query('UPDATE student SET paper_balance =  ? WHERE student_id = ?', [amount, studentId]);
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
        let result = await db.query('SELECT * FROM student WHERE student_id = ?', [studentId]);
        return result[0];
    } 
    catch (error) {
        throw error;
    }
}    

async function getStudentByEmail(studentEmail){
    try {
        let result = await db.query('SELECT * FROM student WHERE student_email = ?', [studentEmail]);
        return result[0];
    } 
    catch (error) {
        throw error;
    }
}

async function getStudentOrderById(studentId) {
    try {
        let result = await db.query('SELECT * FROM print_order WHERE student_id = ?', [studentId]);
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