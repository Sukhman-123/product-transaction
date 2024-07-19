const axios = require("axios");
const ProductTransaction = require("../models.js/transaction");

const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    await ProductTransaction.insertMany(data);
    res.status(200).send("Database initialized with seed data");
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const listTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(`${month}-01`),
      $lt: new Date(
        new Date(`${month}-01`).setMonth(new Date(`${month}-01`).getMonth() + 1)
      ),
    },
  };

  if (search) {
    const searchRegex = { $regex: search, $options: "i" };
    query.$or = [{ title: searchRegex }, { description: searchRegex }];
    // Add price condition if search can be a number
    const searchNumber = parseFloat(search);
    if (!isNaN(searchNumber)) {
      query.$or.push({ price: searchNumber });
    }
  }

  try {
    const transactions = await ProductTransaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(`${month}-01`),
      $lt: new Date(`${month}-01`).setMonth(
        new Date(`${month}-01`).getMonth() + 1
      ),
    },
  };

  try {
    const totalSaleAmount = await ProductTransaction.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const totalSoldItems = await ProductTransaction.countDocuments({
      ...query,
      sold: true,
    });
    const totalNotSoldItems = await ProductTransaction.countDocuments({
      ...query,
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).send("Error fetching statistics");
  }
};

const transactionController = {
  initializeDatabase,
  listTransactions,
  getStatistics,
};

module.exports = transactionController;
