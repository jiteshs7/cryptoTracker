import React, { FC } from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, ThemeProvider } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";

import { CryptoState } from "../helper/CryptoContext";
import { darkTheme } from "../helper/constants";
import AuthModal from "./auth/AuthModal";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      display: "flex",
      alignItems: "center",
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      justifyContent: "space-between",
      cursor: "pointer",
      position: "inherit",
    },
  })
);

const Header: FC = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const { currency, user, changeCurrency } = CryptoState();

  const handleCurrencyChange = (val: any) => {
    changeCurrency(val);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => navigate("/welcome")}
              className={classes.title}
            >
              Crypto Tracker
            </Typography>
            <Select
              onChange={(event) => handleCurrencyChange(event.target.value)}
              value={currency}
              variant="outlined"
              style={{
                color: "#fff",
                width: 150,
                height: 40,
                marginRight: 15,
              }}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>

            {user ? <Sidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
