import React, { FC, lazy, Suspense } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/styles";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Home from "./screens/home/Home";
import Alert from "./components/Alert";

const NotFound = lazy(() => import("./screens/notFound/NotFound"));

const Coin = lazy(() => import("./screens/coin/Coin"));

const useStyles = makeStyles({
  app: {
    backgroundColor: "#14161A",
    color: "#fff",
    minHeight: "100vh",
  },
});

const App: FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.app}>
        <Header />
        <div>
          <Suspense>
            <Routes>
              <Route path="/" element={<Navigate to="/welcome" replace />} />
              <Route path="/welcome" element={<Home />} />
              <Route path="/coin/:id" element={<Coin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      <Alert />
    </>
  );
};

export default App;
