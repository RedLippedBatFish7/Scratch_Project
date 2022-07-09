// import { Route, NavLink, HashRouter } from 'react-router-dom';
import { CssBaseline, makeStyles } from '@material-ui/core';
import MenuComponent from './components/MenuComponent';
import SellerLogin from './components/SellerLogin';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import Feed from './components/Feed';
import Nav from './components/Nav'; //    < SAIF WZ HERE >
import Body from './components/Body';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SellerBody from './components/SellerBody';
import SellerSignUp from './components/SellerSignUp';
import { Routes, Route, Navigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  webmain: {
    backgroundColor: '#686de0',
    color: 'black',
  },
}));

// <div id='map'>
//     <Map/>
// </div>

// create App
const App = () => {
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userZip, setUserZip] = useState(12345);
  const [buyerId, setBuyerId] = useState(2);

  if (isLoggedIn) {
    return (
      <div className={classes.webmain}>
        <CssBaseline />
        <Routes>
          {/* This route will see we're on "/" and auto-redirect to /feed. "/" isn't possible while logged in */}
          <Route path='/' element={<Navigate to='/feed' replace={true} />} />
          {/* Nav bar */}
          <Route path='/' element={<Nav setIsLoggedIn={setIsLoggedIn} />}>
            {/* buyer feed */}
            <Route
              path='/feed'
              element={<Feed userZip={userZip} buyerId={buyerId} />}
            >
              <Route path='/feed/:sellerId' />{' '}
              {/* don't need an element here */}
            </Route>
          </Route>
        </Routes>
      </div>
    );
  }

  return (
    <div className={classes.webmain}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Nav setIsLoggedIn={() => {}} />}>
          {/* Displayed at same time as nav bar */}
          <Route path='/' element={<Body setIsLoggedIn={setIsLoggedIn} />}>
            {/* Displayed at same time as generic body */}
            <Route
              path='/login'
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setUserZip={setUserZip}
                  setBuyerId={setBuyerId}
                />
              }
            />
            <Route
              path='/signup'
              element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
            />
          </Route>
          <Route
            path='/seller'
            element={<SellerBody setIsLoggedIn={setIsLoggedIn} />}
          >
            {/* Displayed at same time as seller body */}
            <Route
              path='/seller/login'
              element={
                <SellerLogin
                  setIsLoggedIn={setIsLoggedIn}
                  setUserZip={setUserZip}
                />
              }
            />
            <Route
              path='/seller/signup'
              element={<SellerSignUp setIsLoggedIn={setIsLoggedIn} />}
            />
          </Route>
          {/* buyer feed */}
          {/* <Route path='/feed' element={<SignUp />} /> */}

          {/* this currently uses a "catch all" to redirect to the "/" route */}
          {/* could be super useful as a "catch all" to display a 404 page, though! */}
          {/* on the downside, we'd have to make a redirect route for every route that exists when signed in */}
          {/* ! OR we could make the paths a bit dirtier by adding a prefix that all routes would share if signed in */}
          {/* but really I don't mind just having a bunch of routes */}
          <Route path='/*' element={<Navigate to='/' replace={true} />} />
        </Route>
      </Routes>
    </div>
  );
};
// export App
export default App;
