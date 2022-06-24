import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { CryptoState } from "../helper/CryptoContext";
const Alert = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event?: any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false, message: "", type: alert.type });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={alert.type}
        elevation={6}
        variant="filled"
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
