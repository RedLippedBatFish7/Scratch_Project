import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cooking from '../assets/cooking.jpg';
import Button from '@material-ui/core/Button';
import { Stack } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'

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

export default function Body() {
  //Declare variables and state
  const classes = useStyles();
  //Return back to DOM
  return (
    <div className={classes.body}>
      <Paper className = {classes.feedItem}
      >
        <h2> this is a feedItem1</h2>
        <p>Something about the feedItem1</p>
        <h3>this is a feedItem2</h3>
        <p>something about the feedItem2</p>
      </Paper>
      <Outlet />
    </div>
  );
}

