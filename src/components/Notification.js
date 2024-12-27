import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Slide } from "@mui/material";

// Function to transition the Snackbar
const Transition = (props) => {
  return <Slide {...props} direction="down" />;
};

const AlertComponent = ({ open, handleClose, severity, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={Transition} // Add transition
      sx={{ marginTop: "70px" }} // Add margin to the top
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: "100%",
          borderRadius: "8px",
          fontWeight: "500",
          "& .MuiAlert-icon": {
            fontSize: "20px", // Larger icon
          },
          "& .MuiAlert-message": {
            fontSize: "16px", // Larger message font
          },
        }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertComponent;
