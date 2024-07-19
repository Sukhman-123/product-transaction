import axios from "axios";

const BASE_URL = "mongodb://localhost:27017/product_transaction"; // Update this with your actual backend URL

const formatMonth = (month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = monthNames.indexOf(month);
  const formattedMonth =
    monthIndex !== -1 ? `2021-${String(monthIndex + 1).padStart(2, "0")}` : "";
  return formattedMonth;
};

export const fetchTransactions = async (
  month,
  searchQuery = "",
  page = 1,
  perPage = 10
) => {
  try {
    const formattedMonth = formatMonth(month);
    const response = await axios.get(`${BASE_URL}/transactions`, {
      params: { month: formattedMonth, searchQuery, page, perPage },
    });
    return response;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const fetchStatistics = async (month) => {
  try {
    const formattedMonth = formatMonth(month);
    const response = await axios.get(`${BASE_URL}/statistics`, {
      params: { month: formattedMonth },
    });
    return response;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

export const fetchBarChart = async (month) => {
  try {
    const formattedMonth = formatMonth(month);
    const response = await axios.get(`${BASE_URL}/barchart`, {
      params: { month: formattedMonth },
    });
    return response;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error;
  }
};

export const fetchPieChart = async (month) => {
  try {
    const formattedMonth = formatMonth(month);
    const response = await axios.get(`${BASE_URL}/piechart`, {
      params: { month: formattedMonth },
    });
    return response;
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    throw error;
  }
};

export const fetchCombinedData = async (month) => {
  try {
    const formattedMonth = formatMonth(month);
    const response = await axios.get(`${BASE_URL}/combined`, {
      params: { month: formattedMonth },
    });
    return response;
  } catch (error) {
    console.error("Error fetching combined data:", error);
    throw error;
  }
};
