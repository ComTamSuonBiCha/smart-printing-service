const {addDocument} = require('../model/DocumentModel');

async function insertDocument(req, res) {
    try {
        let document = {
            file_name: req.body.file_name,
            file_size: req.body.file_size,
            file_type: req.body.file_type,
            no_of_pages: req.body.no_of_pages
        };
        let result = await addDocument(document);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to insert document');
    }
}

module.exports = {
    insertDocument
};