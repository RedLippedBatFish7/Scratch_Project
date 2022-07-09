import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cooking from '../assets/cooking.jpg';

import Button from '@material-ui/core/Button';
import { Stack } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import ZipCodeGrab from './ZipCodeGrab';


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
  const classes = useStyles();
  // const ZipCode = props.userZip;
  // const UserId = props.userId;
  const [zipCodeAssigned, setZipCodeAssigned] = useState(false);
  const [feedActive, setFeedActive] = useState(true);

  // define state
  const [kitchens, setKitchens] = useState({});

  // FEED COMPONENT
  // state: cartState
  // path: '/feed'

  // Cards component (all cards rendered here) // you are here
  // path: '/feed' exact
  // button routes us to '/feed/:sellerid'

  // Seller Page
  // path: '/feed/:sellerId' exact

  // useEffect to update the state exactly once here


  console.log('Feed component hit, rendered with a zipcode of ', props.userZip);
  console.log('Buyer Id recognized as ', props.userId);

  if (props.userZip || zipCodeAssigned) {
    return (
      <div className={classes.body}>
        <div className={classes.heavyFont}>
          {' '}
          Successfully Loaded Zip as {zipCodeAssigned || props.userZip}!
        </div>
        <h1 className={classes.heavyFont}>{`Test feed`}</h1>
        <Outlet />
      </div>
    );

  } else {
    return (
      <div className={classes.body}>
        <ZipCodeGrab
          userId={props.userId}
          setUserZip={props.setUserZip}
          setZipCodeAssigned={setZipCodeAssigned}
        />
        <h1 className={classes.heavyFont}>{`Test feed`}</h1>
        <Outlet />
      </div>
    );
  }
}
