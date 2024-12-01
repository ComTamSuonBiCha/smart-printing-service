const db = require('../config/database');

async function getSPSO(spsoId) {
    try {
        let spso = await db.query('SELECT * FROM spso WHERE spso_id = $1', [spsoId]);
        return spso.rows[0];
    }
    catch (err) {
        throw { status: 500, error: err, message: 'Failed to get SPSO' };
    }
}

module.exports = {
    getSPSO
};