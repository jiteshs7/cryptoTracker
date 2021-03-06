import React, { FC, useEffect, useState } from "react";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import CoinInfo from "../../components/CoinInfo";

import { singleCoin } from "../../config/api";
import { numberWithCommas } from "../../helper/constants";
import { CryptoState } from "../../helper/CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../helper/firebase";
import { useCallback } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    marketData: {
      paddingBottom: 20,
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "10%",
      borderRight: "2px solid gray",
      paddingRight: "2%",
      paddingLeft: "2%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    btn: {
      width: "100%",
      height: 40,
      backgroundColor: "#EEBC1D",
    },
    header: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    desc: {
      width: "100%",
      fontFamily: "Montserrat",
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
  })
);

type ParamProps = {
  id: string;
};

const Coin: FC = () => {
  const [coin, setCoin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id: coinId } = useParams<ParamProps>();
  const { currency, symbol, user, watchList, setAlert } = CryptoState();

  const fetchCoinData = useCallback(() => {
    setIsLoading(true);
    fetch(singleCoin(coinId))
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          setAlert({
            open: true,
            message: data.error,
            type: "error",
          });
          setIsLoading(false);
          return;
        }
        setCoin(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("ERROR", err);
        setIsLoading(false);
      });
  }, [coinId, setAlert]);

  useEffect(() => {
    fetchCoinData();
  }, [coinId, fetchCoinData]);

  const classes = useStyles();

  const isInWatchList = watchList.includes(coin?.id);

  const addToList = async () => {
    if (!user || !Object.keys(user).length) return;

    const coinRef = doc(db, "watchList", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchList ? [...watchList, coin.id] : [coin.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} added to the watch list!`,
        type: "success",
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const removeFromList = async () => {
    if (!user || !Object.keys(user).length) return;

    const coinRef = doc(db, "watchList", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((list: string) => list !== coin?.id),
        },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} removed from the watch list!`,
        type: "warning",
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  if (isLoading)
    return <LinearProgress style={{ background: "gold", marginTop: "5%" }} />;

  if (!coin || !coin.market_data)
    return (
      <div style={{ fontSize: 26, textAlign: "center", paddingTop: "20%" }}>
        Coin Not Found!
      </div>
    );

  const Content = () => (
    <>
      <img
        src={coin?.image?.large}
        alt={coin?.name}
        height="200"
        style={{ marginBottom: 20 }}
      />
      <Typography variant="h3" className={classes.header}>
        {coin?.name}
      </Typography>

      <Typography variant="subtitle1" className={classes.desc}>
        {coin?.description?.en.split(".")[0]}
      </Typography>
      <div className={classes.marketData}>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.header}>
            Rank:
          </Typography>
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat", marginLeft: 5 }}
          >
            {coin?.market_cap_rank}
          </Typography>
        </span>

        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.header}>
            Current Price:
          </Typography>
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat", marginLeft: 5 }}
          >
            {symbol}
            {numberWithCommas(
              coin?.market_data?.current_price[currency.toLowerCase()].toFixed(
                2
              )
            )}
          </Typography>
        </span>

        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.header}>
            Market Cap:
          </Typography>
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat", marginLeft: 5 }}
          >
            {symbol}
            {numberWithCommas(
              coin?.market_data?.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )}
            M
          </Typography>
        </span>
        {user &&
          (!isInWatchList ? (
            <Button
              variant="contained"
              className={classes.btn}
              onClick={addToList}
            >
              Add to watch list
            </Button>
          ) : (
            <Button
              variant="contained"
              className={classes.btn}
              style={{ backgroundColor: "#ff0000", color: "#000" }}
              onClick={removeFromList}
            >
              Remove from watch list
            </Button>
          ))}
      </div>
    </>
  );

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <Content />
      </div>

      <CoinInfo coinId={coinId} />
    </div>
  );
};

export default Coin;
