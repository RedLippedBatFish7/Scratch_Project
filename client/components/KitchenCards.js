import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  typography: {
    subtitle1: {
      fontSize: 10,
      fontStyle: 'sans-serif',
    },
    subtitle2: {
      fontsize: 2,
    },
    button: {
      fontStyle: 'italic',
    },
  },
  buttons: {
    backgroundColor: '#A4DDED',
    color: '#00538C',
  },
  boxes: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFA07A',
    borderRadius: 10,
    border: '1px white',
    '&:hover': {
      backgroundColor: '#e6906e',
      opacity: [0.9, 0.8, 0.7],
    },
  },
}));

const Card = (props) => {
  const classes = useStyles();
  // set box shadow state
  const [shadow, setShadow] = useState(2);
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();

    // stop rendering full feed when user click button
    props.setFeedActive(false);
    //navigate to /feed/sellerID
    console.log(props.setfloatCart);
    navigate(`/feed/${props.kitchenID}`, {
      state: {
        setfloatCart: { a: { b: 1 } },
        // floatCart: props.floatCart,
        // addToCart: () => {},
        // removeFromCart: () => {},
      },
    });
  };

  return (
    <div>
      <Box
        className={classes.boxes}
        m={1.5}
        boxShadow={shadow}
        onMouseOver={() => {
          setShadow(10);
        }}
        onMouseOut={() => {
          setShadow(2);
        }}
      >
        <div
          id='kitchenCard'
          style={{ display: 'flex', flexDirection: ' column' }}
        >
          <div
            id='kitchen'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 0,
              paddingBottom: 0,
            }}
          >
            <h1>{props.kitchenName}</h1>
          </div>
          <div
            id='kitchenBio'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 25,
              marginRight: 25,
              backgroundColor: '#fdc',
              borderRadius: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <p style={{ fontSize: 14 }}>{props.bio}</p>
          </div>
          <div
            id='bottomCard'
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignContent: 'center',
              margin: 15,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <b>Pick-up Window:</b>
              <i>
                {props.timeStart} - {props.timeEnd}
              </i>
            </div>
            <Button
              className={classes.buttons}
              variant='contained'
              onClick={onClick}
            >
              Order Here
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Card;
