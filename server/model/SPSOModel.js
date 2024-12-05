const db = require('../db/database');

async function getSPSOById(spsoId) {
    try {
        let spso = await db.query('SELECT * FROM spso WHERE spso_id = $1', [spsoId]);
        return spso.rows[0];
    }
    catch (err) {
        throw { status: 500, error: err, message: 'Failed to get SPSO' };
    }
}

async function getSPSOByName(spsoName) {
    try {
        let spso = await db.query('SELECT * FROM spso WHERE spso_name = $1', [spsoName]);
        return spso.rows[0];
    }
    catch (err) {
        throw { status: 500, error: err, message: 'Failed to get SPSO' };
    }
}
module.exports = {
    getSPSOById,
    getSPSOByName
};