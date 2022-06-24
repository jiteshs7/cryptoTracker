import { rest } from "msw";

export const handlers = [
  rest.get(
    // "https://api.coingecko.com/api/v3/coins/markets?vs_currency=$&order=market_cap_desc&per_page=100&page=1&sparkline=false",
    "https://api.coingecko.com/api/v3/coins/markets",
    (req, res, ctx) => {
      // const currency = req.url.searchParams.get("vs_currency");
      // const order = req.url.searchParams.get("order");
      // const perPage = req.url.searchParams.get("per_page");
      // const page = req.url.searchParams.get("page");
      // const sparkline = req.url.searchParams.get("sparkline");
      return res(
        ctx.json([
          {
            current_price: 1857127,
            id: "bitcoin",
            image:
              "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
            last_updated: "2022-06-13T11:36:41.800Z",
            low_24h: 1845713,
            market_cap: 35191085911504,
            market_cap_change_24h: -5669626752899.672,
            market_cap_change_percentage_24h: -13.8755,
            market_cap_rank: 1,
            max_supply: 21000000,
            name: "Bitcoin",
            price_change_24h: -288041.38046096894,
            price_change_percentage_24h: -13.42745,
            symbol: "btc",
          },
          {
            current_price: 93678,
            id: "ethereum",
            image:
              "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
            last_updated: "2022-06-13T11:37:31.261Z",
            low_24h: 92714,
            market_cap: 11283910880211,
            market_cap_change_24h: -2518668855654.8516,
            market_cap_change_percentage_24h: -18.24781,
            market_cap_rank: 2,
            name: "Ethereum",
            price_change_24h: -20566.08576309045,
            price_change_percentage_24h: -18.00192,
            symbol: "eth",
          },
        ])
      );
    }
  ),
  rest.get(
    "https://api.coingecko.com/api/v3/coins/bitcoin",
    (req, res, ctx) => {
      return res(
        ctx.json({
          coingecko_rank: 1,
          coingecko_score: 82.539,
          community_data: {
            facebook_likes: null,
            twitter_followers: 5331196,
            reddit_average_posts_48h: 7.636,
            reddit_average_comments_48h: 657.818,
            reddit_subscribers: 4285642,
          },
          community_score: 81.139,
          country_origin: "",
          description: {
            en: 'Bitcoin is the first successful internet money bas…kitties-need-1-billion-on-eos">CryptoKitties</a>.',
            de: "",
            es: "",
            fr: "",
            it: "",
          },
          developer_data: {
            forks: 32546,
            stars: 64614,
            subscribers: 3937,
            total_issues: 6924,
            closed_issues: 6343,
          },
          developer_score: 98.965,
          genesis_date: "2009-01-03",
          hashing_algorithm: "SHA-256",
          id: "bitcoin",
          image: {
            thumb:
              "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
            small:
              "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
            large:
              "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
          },
          liquidity_score: 99.705,
          localization: {
            en: "Bitcoin",
            de: "Bitcoin",
            es: "Bitcoin",
            fr: "Bitcoin",
            it: "Bitcoin",
          },
          market_cap_rank: 1,
          market_data: {
            current_price: { inr: 1672123, usd: 21407 },
            market_cap: { inr: 31879716817284, usd: 408218217897 },
          },
          name: "Bitcoin",
          symbol: "btc",
        })
      );
    }
  ),
  rest.get(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
    (req, res, ctx) => {
      return res(
        ctx.json({
          prices: [
            [1655485461658, 1607826.9816669957],
            [1655485835944, 1610871.3749926079],
            [1655486144115, 1611209.4378034296],
            [1655486415905, 1614924.991338687],
            [1655486650559, 1611233.556870376],
          ],
        })
      );
    }
  ),
  rest.get(
    // "https://api.coingecko.com/api/v3/coins/markets?vs_currency=$&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h",
    "https://api.coingecko.com/api/v3/coins/markets",
    (req, res, ctx) => {
      // const currency = req.url.searchParams.get("vs_currency");
      // const order = req.url.searchParams.get("order");
      // const perPage = req.url.searchParams.get("per_page");
      // const page = req.url.searchParams.get("page");
      // const sparkline = req.url.searchParams.get("sparkline");
      // const priceChange = req.url.searchParams.get("price_change_percentage");
      return res(
        ctx.json([
          {
            current_price: 1857127,
            id: "bitcoin",
            image:
              "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
            last_updated: "2022-06-13T11:36:41.800Z",
            low_24h: 1845713,
            market_cap: 35191085911504,
            market_cap_change_24h: -5669626752899.672,
            market_cap_change_percentage_24h: -13.8755,
            market_cap_rank: 1,
            max_supply: 21000000,
            name: "Bitcoin",
            price_change_24h: -288041.38046096894,
            price_change_percentage_24h: -13.42745,
            symbol: "btc",
          },
          {
            current_price: 93678,
            id: "ethereum",
            image:
              "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
            last_updated: "2022-06-13T11:37:31.261Z",
            low_24h: 92714,
            market_cap: 11283910880211,
            market_cap_change_24h: -2518668855654.8516,
            market_cap_change_percentage_24h: -18.24781,
            market_cap_rank: 2,
            name: "Ethereum",
            price_change_24h: -20566.08576309045,
            price_change_percentage_24h: -18.00192,
            symbol: "eth",
          },
        ])
      );
    }
  ),
];
