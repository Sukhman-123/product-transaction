import React, { useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";

import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import TransactionsBarChart from "./components/BarChart";
import MonthSelector from "./components/MonthSelector";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Transactions
      </Typography>
      <MonthSelector
        selectedMonth={selectedMonth}
        onChange={setSelectedMonth}
      />
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 20 }}>
            <Statistics selectedMonth={selectedMonth} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: 20 }}>
            <TransactionsBarChart selectedMonth={selectedMonth} />
          </Paper>
        </Grid>
      </Grid>
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <TransactionsTable
          selectedMonth={selectedMonth}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          page={page}
          setPage={setPage}
        />
      </Paper>
    </Container>
  );
};

export default App;
