import React, { useState } from "react";
import { createPayment } from "../ApiService/api";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddPayment = ({ initialCustomerId, onClose }) => {
  const [customerId, setCustomerId] = useState(initialCustomerId || "");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  // Access the current theme
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!description || !amount) {
        alert("Please fill in all required fields."); // Validate input
        return;
      }

      await createPayment(customerId, {
        description,
        amount: parseFloat(amount),
      });

      alert("Payment added successfully!");
      setDescription(""); // Reset the form
      setAmount("");
      if (onClose) {
        onClose();
      }
      window.location.reload();
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to add payment. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        bgcolor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}>
      <Box
        sx={{
          width: "400px",
          padding: "20px",
          bgcolor: theme.palette.background.paper,
          borderRadius: "8px",
          boxShadow: 3,
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            Add Payment
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Customer ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            disabled={!!initialCustomerId}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "16px" }}>
            Add Payment
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddPayment;
