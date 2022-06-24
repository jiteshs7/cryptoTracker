import React from "react";
import ReactDOM from "react-dom/client";
import "react-alice-carousel/lib/alice-carousel.css";

import "./index.css";
import App from "./App";
import CryptoContext from "./helper/CryptoContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CryptoContext>
      <App />
    </CryptoContext>
  </BrowserRouter>
  // </React.StrictMode>
);
