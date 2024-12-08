const db = require('../db/database');

async function getSPSOById(spsoId) {
    try {
        let spso = await db.execute('SELECT * FROM spso WHERE spso_id = ?', [spsoId]);
        return spso[0];
    }
    catch (err) {
        throw { status: 500, error: err, message: 'Failed to get SPSO' };
    }
}

async function getSPSOByName(spsoName) {
    try {
        let spso = await db.execute('SELECT * FROM spso WHERE spso_name = ?', [spsoName]);
        return spso[0];
    }
    catch (err) {
        throw { status: 500, error: err, message: 'Failed to get SPSO' };
    }
}
module.exports = {
    getSPSOById,
    getSPSOByName
};