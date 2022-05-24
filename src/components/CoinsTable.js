import React, { useCallback, useEffect, useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { CryptoState } from "../helper/CryptoContext";
import { darkTheme, numberWithCommas } from "../helper/constants";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171A",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [filteredCoins, fetchFilteredCoins] = useState([]);
  const [page, setPage] = useState(1);

  const { symbol, coins } = CryptoState();

  const navigate = useNavigate();

  const classes = useStyles();

  

  useEffect(() => {
    if (!search) return fetchFilteredCoins(coins);
    else{
      const timer = setTimeout(() => {
        searchCrypto(search);
      }, 500);
  
      return () =>{
        clearTimeout(timer);
      }
    }
  }, [search, coins]);

  

  const searchCrypto = (val) => {
    const filterCoins = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(val) ||
        coin.symbol.toLowerCase().includes(val)
    );

    fetchFilteredCoins(filterCoins);
  };

  const Header = useCallback(() => (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat", margin: 18 }}>
        Crypto currency prices by market cap
      </Typography>

      <TextField
        label="Search for crypto currency..."
        variant="outlined"
        disabled={!coins.length}
        // value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, width: "100%" }}
      />
    </>
  ),[coins]);

  if (!coins || !coins.length)
    return (
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Header />
          <LinearProgress style={{ background: "gold", marginTop: "5%" }} />
        </Container>
      </ThemeProvider>
    );
  else if(!filteredCoins.length) return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Header />
         <p style={{fontSize:18, color:'#EEBC1D'}} >No coins found!</p>
        </Container>
      </ThemeProvider>
  )

  const tableCell = ["Coin", "Price", "24hr Change", "Market Cap"].map(
    (item) => (
      <TableCell
        style={{
          color: "#000",
          fontWeight: "600",
          fontFamily: "Montserrat",
        }}
        key={item}
        align={item === "Coin" ? "inherit" : "right"}
      >
        {item}
      </TableCell>
    )
  );

  const tableBody = filteredCoins
    .slice((page - 1) * 10, (page - 1) * 10 + 10)
    .map((item) => {
      const profit = item.price_change_percentage_24h > 0;

      return (
        <TableRow
          className={classes.row}
          onClick={() => navigate(`/coin/${item.id}`)}
          key={item.id}
        >
          <TableCell
            component="th"
            scope="row"
            style={{ display: "flex", gap: 15 }}
          >
            <img
              src={item?.image}
              alt={item?.name}
              height="50"
              style={{ marginBottom: 10 }}
            />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ textTransform: "uppercase", fontSize: 18 }}>
                {item?.symbol}
              </span>

              <span style={{ color: "darkgray" }}>{item?.name}</span>
            </div>
          </TableCell>

          <TableCell align="right">
            {symbol} {numberWithCommas(item?.current_price.toFixed(2))}
          </TableCell>

          <TableCell
            align="right"
            style={{
              color: profit ? "rgba(14,203,129)" : "red",
              fontWeight: "600",
            }}
          >
            {profit && "+"}
            {item.price_change_percentage_24h.toFixed(2)}
          </TableCell>

          <TableCell align="right">
            {symbol} {numberWithCommas(item?.market_cap.toString().slice(0, 6))}
            M
          </TableCell>
        </TableRow>
      );
    });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Header />
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>{tableCell}</TableRow>
            </TableHead>

            <TableBody>{tableBody}</TableBody>
          </Table>
        </TableContainer>

        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={Number((+filteredCoins.length / 10).toFixed(0))}
          onChange={(_, val) => {
            setPage(val);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
