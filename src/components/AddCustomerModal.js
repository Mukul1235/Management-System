import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function AddCustomerModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("");

  const handleSubmit = () => {
    if (name && phone_number) {
      onAdd({ name, phone_number });
      onClose();
    } else {
      alert("Please enter all required fields");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}>
      <Box
        sx={{
          width: "400px",
          padding: "20px",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 3,
        }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Customer
        </Typography>
        <TextField
          label="Customer Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone_number}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ width: "45%" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ width: "45%" }}>
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddCustomerModal;
