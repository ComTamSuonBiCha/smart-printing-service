const express = require("express");
const router = express.Router();
const printerController = require("../controllers/printerController");

router.post("/", printerController.addNew);
router.post("/page", printerController.updatePage);
router.post("/status", printerController.updateStatus);
router.delete("/", printerController.deleteByID);
router.get("/:id", printerController.getByID);
router.get("/", printerController.getAll);

module.exports = router;
