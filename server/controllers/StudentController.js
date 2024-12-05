const {getBalance, minusBalance, getStudentByEmail, getStudentById, getStudentOrderById, getStudentOrderById} = require('../model/StudentModel');

async function getStudentDetail(req, res, next) {
    try {
        let studentId = req.params.id;
        let results = await getStudentById(studentId);
        if(results == null){
            res.status(404).send('Student not found');
        }
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

async function updateStudentBalance(req, res, next) {
    try {
        let studentId = req.params.id;
        let pages_minus = req.body.pages_minus;
        let cur_balance = await getBalance(studentId);
        if (cur_balance < pages_minus) {
            res.status(400).send('Not enough balance');
        }
        let amount = cur_balance - pages_minus;
        let results = await minusBalance(studentId, amount);
        res.json(results); 
    }
    catch(e){
        next(e);
    }
}

async function getStudentByEmail(req, res, next) {
    try {
        let studentEmail = req.params.email;
        let results = await getStudentByEmail(studentEmail);
        if (results == null) {
            res.status(404).send('Student not found');
        }
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

async function getStudentOrderById(req, res, next) {
    try {
        let studentId = req.params.id;
        let results = await getStudentOrderById(studentId);

        if (results == null) {
            res.status(404).send('Student not found');
        }
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

module.exports = {
    getStudentDetail,
    updateStudentBalance,
    getStudentByEmail,
    getStudentOrderById
};