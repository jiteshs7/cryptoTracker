import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, createContext, useContext, useEffect } from "react";
import { auth, db } from "./firebase";
import { coinList } from "../config/api";

const Crypto = createContext({
  currency: "INR",
  symbol: "₹",
  user: null,
  watchList:[],
  coins:[],
  alert: {
    open: false,
    message: "",
    type: "success",
  },
  setAlert:()=>{},
  changeCurrency: () => {},
});

const CryptoContext = ({ children }) => {
  const [coins, fetchCoins] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [watchList, setWatchList] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth,user =>{
      if(user) setUser(user)
      else setUser(null);
    })
  },[])

  useEffect(() => {
    fetchData();
  }, [currency]);

  const fetchData = () => {
    
    fetch(coinList(currency))
      .then((resp) => resp.json())
      .then((resp) => {
        fetchCoins(resp);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };


  useEffect(() => {
    if(user){
      const coinRef = doc(db,'watchList',user.uid);
      
      var unsubscribe = onSnapshot(coinRef,coin => {
        if(coin.exists()){
          setWatchList(coin.data().coins)
        }
      })

      return () => {
        unsubscribe();
      }
    }
  },[user])

  const changeCurrency = (val) => {
    setCurrency(val);
    if (val === "INR") setSymbol("₹");
    else setSymbol("$");
  };

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        changeCurrency,
        user,
        setUser,
        watchList,
        coins,
        alert,
        setAlert,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
