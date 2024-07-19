import React, { useState, useEffect } from "react";
import { fetchStatistics } from "../api";

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchStatistics(selectedMonth)
      .then((response) => setStatistics(response.data))
      .catch((error) => console.error("Error fetching statistics:", error));
  }, [selectedMonth]);

  return (
    <div>
      <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
      <div>Total Sold Items: {statistics.totalSoldItems}</div>
      <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
    </div>
  );
};

export default Statistics;
