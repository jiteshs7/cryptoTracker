import React, { FC, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, createContext, useContext, useEffect } from "react";
import { auth, db } from "./firebase";
import { coinList } from "../config/api";
import { Color } from "@material-ui/lab";
import { CoinProps, UserProps } from "./Interfaces";

interface AlertProps {
  open: boolean;
  message: string;
  type: Color;
}

interface CryptoProps {
  currency: "INR" | "USD";
  symbol: "₹" | "$";
  changeCurrency: (val: "INR" | "USD") => void;
  user: UserProps | null;
  setUser: (val: any) => void;
  watchList: string[];
  coins: CoinProps[];
  alert: AlertProps;
  setAlert: (val: AlertProps) => void;
}

export const Crypto = createContext<CryptoProps>({
  currency: "INR",
  symbol: "₹",
  user: null,
  watchList: [],
  coins: [],
  alert: {
    open: false,
    message: "",
    type: "success",
  },
  setAlert: () => {},
  changeCurrency: () => {},
  setUser: () => {},
});

interface CryptoContextProps {
  children: JSX.Element | string;
}

const CryptoContext: FC<CryptoContextProps> = ({ children }) => {
  const [coins, fetchCoins] = useState<CoinProps[]>([]);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [symbol, setSymbol] = useState<"₹" | "$">("₹");
  const [user, setUser] = useState<UserProps | null>(null);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [alert, setAlert] = useState<AlertProps>({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && Object.keys(user).length) setUser(user);
      else setUser(null);
    });
  }, []);

  const fetchData = useCallback(() => {
    fetch(coinList(currency))
      .then((resp) => resp.json())
      .then((resp) => {
        fetchCoins(resp);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [currency]);

  useEffect(() => {
    fetchData();
  }, [currency, fetchData]);

  useEffect(() => {
    if (user && Object.keys(user).length) {
      const coinRef = doc(db, "watchList", user.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchList(coin.data().coins);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const changeCurrency = (val: "USD" | "INR") => {
    setCurrency(val);
    if (val === "INR") setSymbol("₹");
    else setSymbol("$");
  };

  const value: CryptoProps = {
    currency,
    symbol,
    changeCurrency,
    user,
    setUser,
    watchList,
    coins,
    alert,
    setAlert,
  };

  return <Crypto.Provider value={value}>{children}</Crypto.Provider>;
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
