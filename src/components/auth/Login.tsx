import React, { FC } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from "../../helper/CryptoContext";
import { makeStyles, createStyles } from "@material-ui/styles";
import useInputReducer from "../../hooks/userInputReducer";
import { handleEmailValidation, handleError } from "../../helper/validation";
import { auth } from "../../helper/firebase";

interface LoginProps {
  handleClose: () => void;
}

const Login: FC<LoginProps> = ({ handleClose }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      btn: {
        backgroundColor: "#EEBC1D",
        color: "#000",
        fontWeight: "bold",
        fontSize: 14,
        "&:hover": {
          backgroundColor: "gold",
          fontWeight: "600",
        },
      },
      error: {
        color: "red",
        fontSize: 12,
      },
    })
  );

  const {
    value: email,
    error: emailError,
    hasError: emailHasError,
    valueChangedHandler: emailHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInputReducer((val) => handleEmailValidation(val));

  const {
    value: password,
    error: passwordError,
    hasError: passwordHasError,
    valueChangedHandler: passwordHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInputReducer((val) => handleError("password", val, 8));

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    emailBlurHandler();
    passwordBlurHandler();

    if (emailHasError || passwordHasError) return;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      emailReset();
      passwordReset();

      setAlert({
        open: true,
        message: `Success! Welcome ${email}`,
        type: "success",
      });

      handleClose();
    } catch (error: any) {
      setAlert({
        open: true,
        message: error?.message,
        type: "error",
      });
    }
  };

  const classes = useStyles();

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter email"
        id="Enter email"
        aria-labelledby="Enter email"
        value={email}
        error={emailHasError}
        helperText={emailError}
        onBlur={emailBlurHandler}
        onChange={emailHandler}
        fullWidth
      />
      {/* {emailHasError && <p className={classes.error}>{emailError}</p>} */}
      <TextField
        variant="outlined"
        id="Enter password"
        type="password"
        label="Enter password"
        aria-labelledby="Enter password"
        value={password}
        error={passwordHasError}
        helperText={passwordError}
        onChange={passwordHandler}
        onBlur={passwordBlurHandler}
        fullWidth
      />
      {/* {passwordHasError && <p className={classes.error}>{passwordError}</p>} */}
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        className={classes.btn}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
