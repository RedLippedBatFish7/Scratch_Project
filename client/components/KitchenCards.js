import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cooking from '../assets/cooking.jpg';
import Button from '@material-ui/core/Button';
import { Stack } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ClassSharp } from '@material-ui/icons';
import { ClassNames } from '@emotion/react';
import { lightGreen } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
  typography: {
    subtitle1: {
      fontSize: 10,
      fontStyle: 'sans-serif'
    },
    subtitle2: {
      fontsize: 2,
    },
    button: {
      fontStyle: 'italic',
    },
  },
  buttons: {
    backgroundColor: '#90ee90',
    color: 'blue'
  },
  boxes: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#d3d3d3',
    borderRadius: 10, 
    border: '1px white',
    '&:hover': {
      backgroundColor: '#a9a9a9',
      opacity: [0.9, 0.8, 0.7],
      borderRadius : 10,
      
      
    }, 
  }
}));

// <div id="entirecard" display:flex, flexDirection:column>
//         <div id="kitchenName"></div>
//         <div id="kitchenBio"></div>
//         <div id="bottom" display:flex, justifyContent:space-evenly>
//             <div id="time"></div>
//             <button>click me</button>
//         </div>
//     </div>


const Card = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.boxes} m = {1.5}  boxShadow = {6}>
        <div id = 'kitchenCard' style = {{display: 'flex', flexDirection : ' column'}}>
          <div id = 'kitchen' style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: -10, paddingBottom: 0}}> 
            <h1>
              {props.kitchenName}
            </h1>
          </div>
          <div id = 'kitchenBio' style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p style = {{fontSize : 14}}>
              {props.bio}
            </p>
          </div>
          <div id = 'bottomCard' style = {{display: 'flex', justifyContent :'space-evenly'}}>
            <p><b>Pick-up Window: </b> </p>
            <p><i>
              {props.timeOps}
             </i></p>
            <Button className = {classes.buttons} variant = 'contained' >       
              Order Here 
            </Button>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Card;