const mongoose = require("mongoose");

const productTransactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  sold: Boolean,
});

module.exports = mongoose.model(
  "Product Transaction",
  productTransactionSchema
);
