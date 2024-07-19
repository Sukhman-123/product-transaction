import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

export const fetchTransactions = (
  month,
  search = "",
  page = 1,
  perPage = 10
) => {
  return axios.get(`${API_BASE_URL}/transactions`, {
    params: { month, search, page, perPage },
  });
};

export const fetchStatistics = (month) => {
  return axios.get(`${API_BASE_URL}/statistics`, { params: { month } });
};

export const fetchBarChart = (month) => {
  return axios.get(`${API_BASE_URL}/bar-chart`, { params: { month } });
};
