import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import TransactionsBarChart from "./components/BarChart";
import MonthSelector from "./components/MonthSelector";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div>
      <MonthSelector
        selectedMonth={selectedMonth}
        onChange={setSelectedMonth}
      />
      <Statistics selectedMonth={selectedMonth} />
      <TransactionsBarChart selectedMonth={selectedMonth} />
      <TransactionsTable
        selectedMonth={selectedMonth}
        searchQuery={searchQuery}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
