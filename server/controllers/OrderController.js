const {insertOrder, getFileType} = require('../model/OrderModel');
const {insertDocument} = require('./DocumentController');
async function addOrder(req, res, next) {
    try {
        let order = req.body;
        let documentId = await insertDocument(order.file);
        let studentId = req.user.studentId;
        let printerId = order.printerId;
        let results = await insertOrder(documentId, studentId, printerId, order);
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

async function validateFileType(req, res, next) {
    try {
        let file = req.file_type;
        const fileTypes = await getFileType();
        // check if the file type is in the list of file types
        if (fileTypes.includes(file)) {
            next();
        } else {
            res.status(400).send('Invalid file type');
        }
    }
    catch(e){
        next(e);
    }
}

module.exports = {
    addOrder,
    validateFileType
};