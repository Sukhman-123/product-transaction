const express = require("express");
const router = express.Router();
const transactionController = require("../controller.js/transaction");

router.get("/initialize", transactionController.initializeDatabase);
router.get("/transactions", transactionController.listTransactions);
router.get("/statistics", transactionController.getStatistics);
router.get("/bar-chart", transactionController.getBarChart);
router.get("/pie-chart", transactionController.getPieChart);
router.get("/combined-data", transactionController.getCombinedData);

module.exports = router;
