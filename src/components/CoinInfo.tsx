import React, { FC, useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles, ThemeProvider } from "@material-ui/styles";
import { Line } from "react-chartjs-2";
import { CircularProgress } from "@material-ui/core";

import { historicalChart } from "../config/api";
import { CryptoState } from "../helper/CryptoContext";
import { darkTheme, chartDays } from "../helper/constants";
import CustomBtn from "./CustomBtn";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        paddingTop: 0,
        padding: 20,
      },
    },
  })
);

interface CoinInfoProps {
  coinId: string | undefined;
}

const CoinInfo: FC<CoinInfoProps> = ({ coinId }) => {
  const [days, setDays] = useState<number>(1);
  const [coinData, setCoinData] = useState<number[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { currency, symbol } = CryptoState();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetch(historicalChart(coinId, days, currency))
      .then((resp) => resp.json())
      .then((resp) => {
        setCoinData(resp.prices);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("HISTORY ERROR", err);
      });
  }, [coinId, currency, days]);

  useEffect(() => {
    fetchData();
  }, [days, currency, fetchData]);

  const handleDayClick = (num: number) => {
    setDays(num);
  };

  const classes = useStyles();

  if (isLoading || !coinData.length)
    return (
      <div className={classes.container}>
        <CircularProgress size={250} thickness={1} style={{ color: "gold" }} />
      </div>
    );

  const daysBtn: JSX.Element[] = chartDays.map((day) => (
    <CustomBtn
      selected={days === day.value}
      key={day.value}
      onClick={() => handleDayClick(day.value)}
    >
      {day.label}
    </CustomBtn>
  ));
  console.log("DATA", coinData.length);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <Line
          data={{
            labels: coinData.map((coin: number[]) => {
              const date = new Date(coin[0]);
              const time =
                date.getHours() > 12
                  ? `${date.getHours() - 12} ${date.getMinutes()} PM`
                  : `${date.getHours()} ${date.getMinutes()} AM`;

              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: coinData.map((coin: number[]) => coin[1]),
                label: `Price (Past ${days} days) in ${symbol}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {daysBtn}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
