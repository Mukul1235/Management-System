import React, { useState } from "react";
import { createCustomer } from "../ApiService/api";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  Paper,
  Typography,
} from "@mui/material";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // success, error, warning, info
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting:", { name, phone });
  try {
    await createCustomer({ name, phone_number: phone });
    setNotification({
      open: true,
      message: "Customer Added Successfully!",
      severity: "success",
    });
    setName("");
    setPhone("");
  } catch (error) {
    console.error("Error adding customer:", error);
    setNotification({
      open: true,
      message: "Failed to add customer. Please try again.",
      severity: "error",
    });
  }
};

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          maxWidth: 400,
          width: "100%",
        }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          Add Customer
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              paddingY: 1.5,
              fontWeight: "bold",
              textTransform: "none",
            }}>
            Add Customer
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCustomer;
