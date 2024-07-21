import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const MonthSelector = ({ selectedMonth, onChange }) => {
  const months = [
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

  return (
    <FormControl fullWidth>
      <InputLabel>Month</InputLabel>
      <Select value={selectedMonth} onChange={(e) => onChange(e.target.value)}>
        {months.map((month, index) => (
          <MenuItem key={index} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MonthSelector;
