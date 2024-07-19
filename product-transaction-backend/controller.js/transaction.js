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

const getStatistics = async (month) => {
  // const { month } = req.query;
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

    return {
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems,
    };
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getBarChart = async (month) => {
  // const { month } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(`${month}-01`),
      $lt: new Date(`${month}-01`).setMonth(
        new Date(`${month}-01`).getMonth() + 1
      ),
    },
  };

  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  try {
    const barChartData = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await ProductTransaction.countDocuments({
          ...query,
          price: { $gte: range.min, $lte: range.max },
        });
        return { range: range.range, count };
      })
    );

    return barChartData;
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getPieChart = async (month) => {
  // const { month } = req.query;

  const [year, monthNumber] = month.split("-");
  const startDate = new Date(year, monthNumber - 1, 1);
  const endDate = new Date(year, monthNumber, 1);

  const query = {
    dateOfSale: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  try {
    const pieChartData = await ProductTransaction.aggregate([
      { $match: query },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
    ]);

    return pieChartData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCombinedData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ success: false, error: error.message });
  }

  try {
    const [statistics, barChart, pieChart] = await Promise.all([
      getStatistics(month),
      getBarChart(month),
      getPieChart(month),
    ]);

    res.status(200).json({
      statistics,
      barChart,
      pieChart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const transactionController = {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
};

module.exports = transactionController;
