import React, { FC } from "react";
import { Box, Button, TextField } from "@material-ui/core";
// import { makeStyles, createStyles } from "@material-ui/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { CryptoState } from "../../helper/CryptoContext";
import useInputReducer from "../../hooks/userInputReducer";
import { handleEmailValidation, handleError } from "../../helper/validation";
import { auth } from "../../helper/firebase";

interface SignUpProps {
  handleClose: () => void;
}

const Signup: FC<SignUpProps> = ({ handleClose }) => {
  const handleCPassValidation = (val: string) => {
    if (val.trim() === "") {
      return {
        isValid: false,
        error: `Please enter confirm password`,
      };
    } else if (val !== password) {
      return {
        isValid: false,
        error: `Passwords do not match`,
      };
    } else {
      return {
        isValid: true,
        error: "",
      };
    }
  };

  // const useStyles = makeStyles(() =>
  //   createStyles({
  //     btn: {
  //       backgroundColor: "#EEBC1D",
  //       color: "#000",
  //       fontWeight: "bold",
  //       fontSize: 14,
  //       "&:hover": {
  //         backgroundColor: "gold",
  //         fontWeight: "600",
  //       },
  //     },
  //     error: {
  //       color: "red",
  //       fontSize: 12,
  //     },
  //   })
  // );

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

  const {
    value: cPassword,
    error: cPasswordError,
    hasError: cPasswordHasError,
    valueChangedHandler: cPasswordHandler,
    inputBlurHandler: cPasswordBlurHandler,
    reset: cPasswordReset,
  } = useInputReducer((val) => handleCPassValidation(val));

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    emailBlurHandler();
    passwordBlurHandler();
    cPasswordBlurHandler();

    if (emailHasError || passwordHasError || cPasswordHasError) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Sign Up Successfull, Welcome ${email}`,
        type: "success",
      });

      emailReset();
      passwordReset();
      cPasswordReset();
      handleClose();
    } catch (error: any) {
      setAlert({
        open: true,
        message: error?.message,
        type: "error",
      });
    }
  };

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
        value={email}
        error={emailHasError}
        helperText={emailError}
        id="Enter email"
        aria-labelledby="Enter email"
        onChange={emailHandler}
        onBlur={emailBlurHandler}
        fullWidth
      />
      {/* {emailHasError && <p className={classes.error}>{emailError}</p>} */}
      <TextField
        variant="outlined"
        type="password"
        label="Enter password"
        id="Enter password"
        aria-labelledby="Enter password"
        error={passwordHasError}
        helperText={passwordError}
        value={password}
        onBlur={passwordBlurHandler}
        onChange={passwordHandler}
        fullWidth
      />
      {/* {passwordHasError && <p className={classes.error}>{passwordError}</p>} */}
      <TextField
        variant="outlined"
        type="password"
        label="Confirm password"
        id="Confirm password"
        aria-labelledby="Confirm password"
        error={cPasswordHasError}
        helperText={cPasswordError}
        value={cPassword}
        onBlur={cPasswordBlurHandler}
        onChange={cPasswordHandler}
        fullWidth
      />
      {/* {cPasswordHasError && <p className={classes.error}>{cPasswordError}</p>} */}
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
