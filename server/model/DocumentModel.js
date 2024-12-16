const db = require('../db/database');
async function addDocument(document) {
    try {
        let result = await db.execute(
            `INSERT INTO documents (file_name, file_size, file_type, no_of_pages) VALUES (?, ?, ?, ?)`,
            [document.file_name, document.file_size, document.file_type, document.no_of_pages]
        );
        return result[0].insertId;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    addDocument
};