import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const TransactionsTable = ({
  selectedMonth,
  searchQuery,
  setSearchQuery,
  page,
  setPage,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTransactions(selectedMonth, searchQuery, page)
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, [selectedMonth, searchQuery, page]);

  return (
    <div>
      <TextField
        label="Search transactions"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        style={{ marginBottom: 20 }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date of Sale</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sold</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.price}</TableCell>
                  <TableCell>
                    {new Date(transaction.dateOfSale).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.sold ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div style={{ marginTop: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage(page + 1)}
          style={{ marginLeft: 10 }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionsTable;
