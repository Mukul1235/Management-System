import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPayment } from "../ApiService/api";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
// import "../styles/Payments.css";

const Payments = ({ customerId }) => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      if (!customerId) return; // Add guard to ensure `customerId` is valid
      try {
        const response = await getPayment(customerId);
        setPayments(response); // Assuming response is the payments array
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, [customerId]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "Transaction ID", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      valueFormatter: (params) => new Date(params).toLocaleString(),
    },
  ];

  // Filter payments based on the search term
  const filteredPayments = payments.filter((payment) =>
    payment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="payments-container">
      <h1>Payments for Customer ID: {customerId}</h1>
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <Paper sx={{ height: 400, width: "100%", marginTop: 2 }}>
        <DataGrid
          rows={filteredPayments}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.id} // Ensure each row has a unique ID
        />
      </Paper>
      {filteredPayments.length === 0 && <p>No transactions found.</p>}
    </div>
  );
};

export default Payments;
