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
        let cur_balance = await getBalance(studentId);
        let new_balance = req.body.new_balance;
        
        


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