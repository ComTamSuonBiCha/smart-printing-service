const {getBalance, minusBalance, getStudentByEmail, getStudentById, getStudentOrderById, getStudentInformationById} = require('../model/StudentModel');

async function getStudentDetail(req, res, next) {
    try {
        let studentId = req.params.id;
        let basic_info = await getStudentById(studentId);
        if(basic_info == null){
            res.status(404).send('Student not found');
        }
        // res.json(results);
        let add_info = await getStudentInformationById(studentId);
        if (add_info == null) {
            res.status(404).send('Student not found');
        }
        let results = {
            ...basic_info,
            ...add_info
        };
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
        // console.log("cur_balance:", cur_balance);
        // console.log("pages_minus:", pages_minus);
        if (cur_balance < pages_minus) {
            res.status(400).send('Not enough balance');
        }
        let amount = cur_balance - pages_minus; // new balance
        // console.log(amount);
        let results = await minusBalance(studentId, amount);
        res.json(results); 
    }
    catch(e){
        next(e);
    }
}

async function getStudentDetailByEmail(req, res, next) {
    try {
        let studentEmail = req.params.email;
        let results = await getStudentByEmail(studentEmail);
        if (results == null) {
            res.status(404).send('Student not found');
        }
        res.json(results);
        //delete res.student_password;
    }
    catch(e){
        next(e);
    }
}

async function getStudentOrderWithId(req, res, next) {
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
    getStudentDetailByEmail,
    getStudentOrderWithId
};