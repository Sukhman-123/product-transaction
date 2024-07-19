import React, { useState, useEffect } from "react";
import { fetchStatistics } from "../api";
import { Typography, Box } from "@mui/material";

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchStatistics(selectedMonth)
      .then((response) => {
        setStatistics(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching statistics:", error);
        setLoading(false);
      });
  }, [selectedMonth]);

  return (
    <Box>
      <Typography variant="h6">Statistics for {selectedMonth}</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box>
          <Typography>
            Total Sale Amount: ${statistics.totalSaleAmount}
          </Typography>
          <Typography>Total Sold Items: {statistics.totalSoldItems}</Typography>
          <Typography>
            Total Not Sold Items: {statistics.totalNotSoldItems}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Statistics;
