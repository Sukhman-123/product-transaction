import React, { useState, useEffect } from "react";
import { fetchBarChart } from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";

const TransactionsBarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChart(selectedMonth)
      .then((response) => setBarChartData(response.data))
      .catch((error) => console.error("Error fetching bar chart data:", error));
  }, [selectedMonth]);

  return (
    <div>
      <Typography variant="h6">Price Range Chart</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsBarChart;
