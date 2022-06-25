import React from "react";
import { render } from "react-dom";
import "react-alice-carousel/lib/alice-carousel.css";

import "./index.css";
import App from "./App";
import CryptoContext from "./helper/CryptoContext";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");
// render(<App />, root);
render(
  // <React.StrictMode>
  <BrowserRouter>
    <CryptoContext>
      <App />
    </CryptoContext>
  </BrowserRouter>,
  root
  // </React.StrictMode>
);
