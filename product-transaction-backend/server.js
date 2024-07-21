const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const transactionRoutes = require("./routes.js/transactionRoutes.js");
const connectDB = require("./db/connection.js");
const dotenv = require("dotenv");

const app = express();
app.use(bodyParser.json());

dotenv.config();

connectDB();
app.use(express.json());

app.use("/", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
