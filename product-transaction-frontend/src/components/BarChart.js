import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { fetchBarChart } from "../api";

const TransactionsBarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChart(selectedMonth)
      .then((response) => setBarChartData(response.data))
      .catch((error) => console.error("Error fetching bar chart data:", error));
  }, [selectedMonth]);

  return (
    <BarChart width={600} height={300} data={barChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default TransactionsBarChart;
