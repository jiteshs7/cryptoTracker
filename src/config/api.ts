export const coinList = (currency: "INR" | "USD") =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const singleCoin = (id: string | undefined) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const historicalChart = (
  id: string = "",
  days: number = 365,
  currency: "INR" | "USD" = "USD"
) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const trendingCoins = (currency: "INR" | "USD") =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
