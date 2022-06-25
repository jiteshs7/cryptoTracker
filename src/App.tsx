import React, { FC, lazy, Suspense } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/styles";
import { Route, Routes, Navigate } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

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
          <Suspense
            fallback={
              <LinearProgress style={{ background: "gold", marginTop: "5%" }} />
            }
          >
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
//@testing-library/react @testing-library/jest-dom @testing-library/react @testing-library/user-event
//@material-ui/styles @material-ui/core @material-ui/lab
//@types/jest @types/node @types/react @types/react-dom
