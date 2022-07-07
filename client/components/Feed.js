import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cooking from '../assets/cooking.jpg';
import Button from '@material-ui/core/Button';
import { Stack } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import KitchenCard from './KitchenCards'

//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
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
  feedItem: {
    marginTop: '15px',
    width: '100%',
    padding: '5px',
    maxWidth: '800px'
  },
  buttons: {
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'space-around'
  }
}));

// ideally would like to make this pops out when hovering over
// useEffect, pull in info of each restaurant, render a component w kitchen card, pass in kitchen, and stuffs.  Push array into 54

export default function Body(props) {
  const classes = useStyles();

// define state
  const [kitchens, setKitchens] = useState({}); 

  // useffect to run code once
  useEffect(() => {
    // simulate fetch result
    // {sellerID: {kitchenName, timeOps, bio}}
    const kitchensFromFetch = { 1 : {kitchenName: 'Space Cat', timeOps: '7:00 AM - 5:00 PM', bio: 'Space Cat Food Theme'}, 
    2:  {kitchenName: 'Brazil Steak', timeOps: '10:00 AM - 5:00 PM', bio: 'Steaks but Brazillian'}, 
    3:  {kitchenName: 'Big Meats', timeOps: '3:00 PM - 8:00 PM', bio: 'We doing it with hella meats'}
    }
    
    setKitchens(kitchensFromFetch)
  }, []);

// for x in state, add component to arr
const kitchenArr = [];

for (let kitchenID in kitchens) {
  const curKitchen = kitchens[kitchenID]
  kitchenArr.push(
    <KitchenCard key={kitchenID} kitchenID={kitchenID} kitchenName={curKitchen.kitchenName} timeOps = {curKitchen.timeOps} bio = {curKitchen.bio} />
  )
}

  //Declare variables and state
  //Return back to DOM
  return (
    <div className={classes.body}>
      <Paper elevation = {2} className = {classes.feedItem}
      >
        {kitchenArr}
      </Paper>
      <Outlet />
    </div>
  );
}
