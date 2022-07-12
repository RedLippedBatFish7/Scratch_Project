import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cooking from '../assets/cooking.jpg';
import Button from '@material-ui/core/Button';
import { Stack } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import ZipCodeGrab from './ZipCodeGrab';
import MenuComponent from './MenuComponent';
import FloatingCart from './FloatingCart';
import axios from 'axios';
import FeedCardsContainer from './FeedCardsContainer';
import { useLocation } from 'react-router';
import { useNavigate, Navigate } from 'react-router-dom';
import Confirmation from './Confirmation.js';

//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: '100vh',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
    backgroundColor: 'transparent',
    padding: '0px 20px',
  },
  heavyFont: {
    color: 'white',
    fontWeight: '900',
    fontSize: '40px',
    fontFamily: 'Nunito',
  },
}));

export default function Body(props) {
  const fakeResponse = {
    kitchenName: "Greg's Kitchen",
    dishes: {
      2: {
        name: 'KFC',
        description: 'finger licking good',
        price: 15,
        quantity: 30,
      },
      3: {
        name: 'Sushi',
        description: 'good stuff',
        price: 35,
        quantity: 100,
      },
    },
  };

  //Declare variables and state
  const classes = useStyles();
  const currentLocation = useLocation();
  const ZipCode = props.userZip;
  const UserId = props.buyerId;
  const [zipCodeAssigned, setZipCodeAssigned] = useState(false);
  const [floatCart, setfloatCart] = useState({ price: 0, dishes: {} });

  useEffect(() => {
    console.log('-------------------', floatCart);
  }, [floatCart]);
  // 1: {
  //   name: ,
  //   quantity: 0,
  // }
  const [feedActive, setFeedActive] = useState(true);
  // define state
  const [kitchens, setKitchens] = useState({});
  const [success, setSuccess] = useState();

  // FEED COMPONENT
  // state: cartState
  // path: '/feed'

  // Cards component (all cards rendered here) // you are here
  // path: '/feed' exact
  // button routes us to '/feed/:sellerid'

  // Seller Page
  // path: '/feed/:sellerId' exact

  // useEffect to update the state exactly once here

  useEffect(() => {
    // axios to get state
    axios
      .get('/feed', {})
      .then((res) => {
        console.log(res.data);
        setKitchens(res.data);
      })
      .catch((error) => {
        console.log(`error in getting kitchen's feed`);
        console.log(error);
      })
      .then(() => {
        console.log(`what's going on?`);
      });
  }, []);

  //Return back to DOM
  // feed component would conditionally render either Cards or SellerPage

  // if zip code not ready, display that and return early
  console.log(ZipCode, zipCodeAssigned);

  // if (success === true) {
  //   return <Confirmation success={true} />;
  // }
  // else if (success === false) {
  //   return <Confirmation success={false} />;
  // }

  // If successfull, render component
  if (!ZipCode && !zipCodeAssigned) {
    return (
      <div className={classes.body}>
        <ZipCodeGrab buyerId={UserId} setZipCodeAssigned={setZipCodeAssigned} />
        <h1 className={classes.heavyFont}>{`Test feed`}</h1>
        <Outlet />
      </div>
    );
  }

  // if kitchens is empty, fetch isn't finished yet, so we don't want to make any decisions yet
  if (Object.keys(kitchens).length === 0) {
    console.log('zip good, fetch not complete');
    return <div>LOADING</div>;
  }

  // if zip code good and fetch complete, some part of the feed will render
  if (feedActive) {
    if (currentLocation.pathname.split('/')[2]) {
      console.log(
        'woah, you shouldnt be here --------------------------------'
      );
      return <Navigate to='/feed' replace={true} />;
    }
  }

  // if kitchens is empty, fetch isn't finished yet, so we don't want to make any decisions yet
  if (Object.keys(kitchens).length === 0) {
    console.log('zip good, fetch not complete');
    return <div>LOADING</div>;
  }

  // if zip code good and fetch complete, some part of the feed will render
  if (feedActive) {
    if (currentLocation.pathname.split('/')[2]) {
      console.log(
        'woah, you shouldnt be here --------------------------------'
      );
      return <Navigate to='/feed' replace={true} />;
    }
    console.log('FEED IS ACTIVE -----');
    return (
      <FeedCardsContainer
        setFeedActive={setFeedActive}
        kitchensFromFeed={kitchens}
        setfloatCart={setfloatCart}
        floatCart={floatCart}
      />
    );
  } else {
    console.log('Feed is inactive');
    return (
      //Display purposes only
      <div className={classes.body}>
        <MenuComponent
          // dishes={fakeResponse}
          // ---------------------------------- this is necessary to pass functions to menucomponent, believe it or not
          setfloatCart={setfloatCart}
          floatCart={floatCart}
          userZip={props.userZip}
        />
        <FloatingCart floatCart={floatCart} />
        />
        <FloatingCart floatCart={floatCart} />
        <Outlet />
      </div>
    );
  }
}
