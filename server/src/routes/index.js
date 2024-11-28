const express = require("express");
const printer = require("./printer");
const router = express.Router();
router.use("/printer", printer);

module.exports = router;
