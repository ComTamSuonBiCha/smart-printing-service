const {getSPSOById, getSPSOByName} = require("../model/SPSOModel");

async function getSPSOByIdController(req, res, next) {
    try {
        let spsoId = req.params.id;
        let results = await getSPSOById(spsoId);
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

async function getSPSOByNameController(req, res, next) {
    try {
        let spsoName = req.params.name;
        let results = await getSPSOByName(spsoName);
        res.json(results);
    }
    catch(e){
        next(e);
    }
}

module.exports = {
    getSPSOByIdController,
    getSPSOByNameController
};