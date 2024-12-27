import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios";
import AddCustomerModal from "../components/AddCustomerModal";
import AddPayment from "../components/AddPayment";
import { createCustomer } from "../ApiService/api";
import { Link } from "react-router-dom";

function Row({ row, onCreatePayment }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.phone_number}</TableCell>
        <TableCell>{row.total_amount || 0}</TableCell>
        <TableCell>
          <Button
            type="button"
            variant="contained"
            size="small"
            onClick={() => onCreatePayment(row.id)}>
            Create Payment
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Payment History
              </Typography>
              <Table size="small" aria-label="payment history">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.payments
                    .slice() // Create a shallow copy to avoid mutating the original array
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort payments in reverse order
                    .map((payment) => (
                      <TableRow key={payment.date}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell align="right">{payment.amount}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="small"
                            href={`/payments/${row.id}`}>
                            View Payment
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    total_amount: PropTypes.number,
    payments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  onCreatePayment: PropTypes.func.isRequired,
};

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/customers/"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    console.log("Hello")

  }, [isPaymentModalOpen]);

const addCustomer = async (newCustomer) => {
  try {
    const response = await createCustomer(newCustomer);
    const addedCustomer = {
      ...response.data, // Assuming the API response includes the new customer with its ID
      payments: [], // Ensure payments is always an array
      total_amount: 0, // Set default total_amount if not provided
    };
    alert("Customer Added!");
    setCustomers((prevCustomers) => [...prevCustomers, addedCustomer]);
  } catch (error) {
    console.error("Error adding customer:", error);
    alert("Failed to add customer.");
  }
};

  const handleCreatePayment = (customerId) => {
    setSelectedCustomerId(customerId);
    setIsPaymentModalOpen(true);
  };

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.phone_number}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search customers"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Total Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <Row
                key={customer.id}
                row={customer}
                onCreatePayment={handleCreatePayment}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => setIsCustomerModalOpen(true)}>
          + Add Customer
        </Button>
      </Box>
      {isCustomerModalOpen && (
        <AddCustomerModal
          onClose={() => setIsCustomerModalOpen(false)}
          onAdd={addCustomer}
        />
      )}
      {isPaymentModalOpen && (
        <AddPayment
          initialCustomerId={selectedCustomerId}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </Box>
  );
}
