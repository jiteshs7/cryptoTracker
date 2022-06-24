import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Box, Button, Tab, Tabs } from "@material-ui/core";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import Login from "./Login";
import Signup from "./Signup";
import { CryptoState } from "../../helper/CryptoContext";
import { auth } from "../../helper/firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      color: "#fff",
      borderRadius: 10,
    },
    btn: {
      width: 85,
      height: 40,
      backgroundColor: "#EEBC1D",
      color: "#000",
      fontWeight: "bold",
      fontSize: 14,
      "&:hover": {
        backgroundColor: "gold",
        fontWeight: "600",
      },
    },
    google: {
      padding: 24,
      paddingTop: 0,
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      gap: 20,
      fontSize: 20,
    },
    googleBtn: {
      backgroundColor: "rgb(23,107,239)",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#4285F4",
      },
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      height: 40,
      width: 40,
      marginLeft: 10,
      marginRight: 30,
    },
    googleLogo: {
      height: 30,
      width: 30,
      borderRadius: 15,
    },
  })
);

const AuthModal: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const [value, setValue] = useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const { setAlert } = CryptoState();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up successfull! welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: err.message,
          type: "error",
        });
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" className={classes.btn} onClick={handleOpen}>
        Login
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "#fff",
                alignItems: "center",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>

            {value === 0 ? (
              <Login handleClose={handleClose} />
            ) : (
              <Signup handleClose={handleClose} />
            )}

            <Box className={classes.google}>
              <span style={{ alignSelf: "center" }}>OR</span>

              <Button
                onClick={handleGoogleSignIn}
                className={classes.googleBtn}
              >
                <div className={classes.logoContainer}>
                  <img
                    src={
                      "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                    }
                    className={classes.googleLogo}
                    alt="Google logo"
                  />
                </div>
                <span
                  style={{
                    alignSelf: "center",
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#fff",
                  }}
                >
                  Sign in with google
                </span>
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
