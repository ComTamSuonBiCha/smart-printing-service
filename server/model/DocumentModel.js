const db = require('../db/database');
async function addDocument(document) {
    try {
        let result = await db.query(
            `INSERT INTO document (file_name, file_size, file_type, no_of_pages) VALUES (?, ?, ?)`,
            [document.file_name, document.file_size, document.file_type, document.no_of_pages]
        );
        return result;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    addDocument
};