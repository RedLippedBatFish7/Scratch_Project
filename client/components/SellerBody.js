import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Doughy from '../assets/doughy.jpg';
import Button from '@material-ui/core/Button';
import { Stack } from '@mui/material';
import SignUp from './SignUp';
import Login from './Login';
import { Outlet, Link } from 'react-router-dom';

//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Baking})`,
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
  buttonNest: {
    display: 'flex',
    margin: '0px 10px',
  },
}));

export default function Body() {
  //Declare variables and state
  const classes = useStyles();
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogin] = useState(false);
  let signUpModule;

  //Sign-up Card Display Function
  const signUpFunc = (action) => {
    if (action == 'sign') {
      console.log('Button Clicked, sign up was ', signUp);
      setSignUp(!signUp);
      console.log('Sign up is now ', signUp);
    } else {
      setLogin(!logIn);
    }
  };

  if (signUp) {
    //signUpModule = <SignUp />;
  }

  if (logIn) {
    //signUpModule = <Login />;
  }

  //Return back to DOM
  return (
    <div className={classes.body}>
      <h1 className={classes.heavyFont}>
        {' '}
        Grandma's cooking is a button press away
      </h1>
      {signUpModule}
      <Stack direction='row' spacing={2}>
        <Button
          component={Link}
          to='/signup'
          variant='contained'
          color='primary'
          onClick={() => {
            signUpFunc('sign');
          }}
        >
          Sign up
        </Button>
        <Button
          component={Link}
          to='/login'
          variant='contained'
          color='secondary'
          onClick={() => {
            signUpFunc('log');
          }}
        >
          Login
        </Button>
      </Stack>
      <Outlet />
    </div>
  );
}
