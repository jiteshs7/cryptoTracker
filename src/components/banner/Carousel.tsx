import React, { FC, useCallback, useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

import { trendingCoins } from "../../config/api";
import { CryptoState } from "../../helper/CryptoContext";
import { numberWithCommas } from "../../helper/constants";
import { CoinProps } from "../../helper/Interfaces";

const useStyle = makeStyles(() =>
  createStyles({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      transform: "uppercase",
      color: "#fff",
    },
  })
);

const Carousel: FC = () => {
  const [coins, fetchCoins] = useState<CoinProps[]>([]);

  const classes = useStyle();

  const { currency, symbol } = CryptoState();

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const fetchTrendingCoins = useCallback(() => {
    fetch(trendingCoins(currency))
      .then((resp) => resp.json())
      .then((data) => fetchCoins(data))
      .catch((err) => console.log("ERROR", err));
  }, [currency]);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency, fetchTrendingCoins]);

  if (!coins.length) return <span>Loading...</span>;

  const items = coins.map((coin: CoinProps) => {
    let profit = coin?.price_change_percentage_24h > 0;

    return (
      <Link
        key={coin.id}
        to={`/coin/${coin.id}`}
        className={classes.carouselItem}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgba(14,203,129)" : "red",
              fontWeight: "600",
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h.toFixed(2)}
          </span>
          &nbsp;
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
