import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Crypto as CryptoContext } from "../helper/CryptoContext";
import { MemoryRouter } from "react-router-dom";

const coins = [
  {
    ath: 5128383,
    ath_change_percentage: -69.37895,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 3993.42,
    atl_change_percentage: 39223.81513,
    atl_date: "2013-07-05T00:00:00.000Z",
    circulating_supply: 19072106,
    current_price: 1561354,
    fully_diluted_valuation: 32788441937713,
    high_24h: 1614573,
    id: "bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    last_updated: "2022-06-20T06:32:09.603Z",
    low_24h: 1425482,
    market_cap: 29778316200519,
    market_cap_change_24h: 2496788470471,
    market_cap_change_percentage_24h: 9.15194,
    market_cap_rank: 1,
    market_data: {
      current_price: { inr: 1672123, usd: 21407 },
      market_cap: { inr: 31879716817284, usd: 408218217897 },
    },
    max_supply: 21000000,
    name: "Bitcoin",
    price_change_24h: 130170,
    price_change_percentage_24h: 9.09527,
    roi: null,
    symbol: "btc",
    total_supply: 21000000,
    total_volume: 2424409575749,
  },
  {
    ath: 362338,
    ath_change_percentage: -76.64518,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 28.13,
    atl_change_percentage: 300716.77127,
    atl_date: "2015-10-20T00:00:00.000Z",
    circulating_supply: 121238650.8115,
    current_price: 84032,
    fully_diluted_valuation: null,
    high_24h: 89289,
    id: "ethereum",
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    last_updated: "2022-06-20T06:32:24.100Z",
    low_24h: 74479,
    market_cap: 10187923078710,
    market_cap_change_24h: 1136094998725,
    market_cap_change_percentage_24h: 12.551,
    market_cap_rank: 2,
    market_data: {
      current_price: { inr: 1272123, usd: 20407 },
      market_cap: { inr: 31879716817284, usd: 408218217897 },
    },
    max_supply: null,
    name: "Ethereum",
    price_change_24h: 9391.98,
    price_change_percentage_24h: 12.58303,
    roi: {
      times: 70.91421092122071,
      currency: "btc",
      percentage: 7091.421092122071,
    },
    symbol: "eth",
    total_supply: null,
    total_volume: 1591619734159,
  },
];

const user = {
  accessToken: "abcd",
  email: "js@email.com",
  providerId: "firebase",
  uid: "okBoy",
  photoURL: null,
};

const watchList = ["bitcoin", "ethereum", "tether"];

const renderWithContext = (ui, options, otherVals) =>
  render(
    <CryptoContext.Provider
      value={{
        currency: "USD",
        symbol: "$",
        changeCurrency: jest.fn(),
        user,
        setUser: jest.fn(),
        watchList,
        coins,
        alert,
        setAlert: jest.fn(),
        ...otherVals,
      }}
    >
      {ui}
    </CryptoContext.Provider>,
    {
      wrapper: MemoryRouter,
      ...options,
    }
  );

// re-exporting everything

export * from "@testing-library/react";

// overriding render method

export { renderWithContext as render };
