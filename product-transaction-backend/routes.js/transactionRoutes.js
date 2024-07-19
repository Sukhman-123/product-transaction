const express = require("express");
const router = express.Router();
const transactionController = require("../controller.js/transaction");

router.get("/initialize", transactionController.initializeDatabase);
router.get("/transactions", transactionController.listTransactions);

module.exports = router;
