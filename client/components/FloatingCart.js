import axios from 'axios';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { Stack } from '@mui/material';
import MenuItem from './MenuItem';
import { PropaneSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    top: '0',
    margin: '10% 0',
    width: '300px',
    height: '85%',
    right: '0',
    padding: '10px',
    zIndex: '-1px',
    marginTop: '120px',
    marginRight: '30px',
  },
}));

export default function (props) {
  const classes = useStyles();

  const navigate = useNavigate();

  console.log(props);

  const checkout = () => {
    axios
      .post('/checkout', {
        dishes: props.floatCart.dishes,
      })
      .then((res) => {
        window.location.assign(res.data.url);
        //navigate(res.data.url);
        // console.log(res);
      });
  };

  return (
    <div>
      <Paper className={classes.footer}>
        <Stack>
          <h1>${props.floatCart.price}</h1>
          <h3> Current Cart: </h3>
          Here's where we'd put food if <br />
          we had time to add that feature {':)'}
          <h3> Kyle's Scrambla </h3>
          <Button color='primary' onClick={checkout}>
            Checkout
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
