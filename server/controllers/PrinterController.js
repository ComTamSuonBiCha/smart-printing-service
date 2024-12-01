const {
  addPrinter,
  updatePrinterPage,
  updatePrinterStatus,
  deletePrinter,
  getPrinterByID,
  getAllPrinter,
} = require("../models/Printer");
async function addNew(req, res, next) {
  const data = req.body;
  try {
    const result = await addPrinter(data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
async function updatePage(req, res, next) {
  const data = req.body;
  try {
    const result = await updatePrinterPage(data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
async function updateStatus(req, res, next) {
  const data = req.body;
  try {
    const result = await updatePrinterStatus(data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
async function deleteByID(req, res, next) {
  const data = req.body;
  try {
    let foundPrinter = await getPrinterByID(data);
    if (foundPrinter[0] == null) {
      return res.status(404).json({ message: "Printer not found" });
    }
    const result = await deletePrinter(data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
async function getByID(req, res, next) {
  const printerID = req.params.id;
  try {
    const printer = await getPrinterByID(printerID);

    if (printer[0] == null) {
      return res.status(404).json({ message: "Printer not found" });
    }

    res.json(printer);
  } catch (err) {
    next(err);
  }
}
async function getAll(req, res, next) {
  const data = req.query;
  console.log(data);
  try {
    const printers = await getAllPrinter(data);
    res.json(printers);
  } catch (err) {
    console.error("Error fetching printers:", err);
    next(err);
  }
}
module.exports = {
  addNew,
  updatePage,
  updateStatus,
  deleteByID,
  getByID,
  getAll,
};
