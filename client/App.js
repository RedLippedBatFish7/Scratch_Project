import React, { Component } from "react";
// import { Route, NavLink, HashRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Nav from "./components/Nav";
import Body from "./components/Body";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SellerBody from "./components/SellerBody";
import SellerLogin from "./components/SellerLogin";
import SellerSignUp from "./components/SellerSignUp";
// // import './stylesheets/styles.scss';

import { Routes, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  webmain: {
    backgroundColor: "#686de0",
    color: "black",
  },
}));

// create App
const App = () => {
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className={classes.webmain}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Nav />}>
          {/* Displayed at same time as nav bar */}
          <Route path="/" element={<Body setIsLoggedIn={setIsLoggedIn} />}>
            {/* Displayed at same time as generic body */}
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/signup"
              element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
            />
          </Route>
          <Route
            path="/seller"
            element={<SellerBody setIsLoggedIn={setIsLoggedIn} />}
          >
            {/* Displayed at same time as seller body */}
            <Route
              path="/seller/login"
              element={<SellerLogin setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/seller/signup"
              element={<SellerSignUp setIsLoggedIn={setIsLoggedIn} />}
            />
          </Route>
          {/* buyer feed */}
          <Route path="/feed" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
};
// export App
export default App;
