import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline, Box, Typography } from "@mui/material";

import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import TransactionsBarChart from "./components/BarChart";
import MonthSelector from "./components/MonthSelector";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#e0f7fa",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          TRANSACTION DASHBOARD
        </Typography>
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <Box sx={{ flexGrow: 1, marginRight: "20px" }}>
            <input
              type="text"
              placeholder="Search transaction"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "60%",
                padding: "15px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, marginRight: "20px" }}>
            <MonthSelector
              selectedMonth={selectedMonth}
              onChange={setSelectedMonth}
            />
          </Box>
        </Container>
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <TransactionsTable
            selectedMonth={selectedMonth}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            page={page}
            setPage={setPage}
          />
        </Container>
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <Statistics selectedMonth={selectedMonth} />
        </Container>
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TransactionsBarChart selectedMonth={selectedMonth} />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
