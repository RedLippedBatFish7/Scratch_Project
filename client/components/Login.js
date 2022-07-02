const axios = require('axios');
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardContent, Paper, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Stack } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  signupstack: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    margin: '30px auto auto 0px',
    left: '20%',
    right: '20%',
    zIndex: '1',
  },
}));

export default function Login(props) {
  const classes = useStyles();

  // set form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch here
    axios
      .post('http://localhost:3000/auth/login', {
        username,
        password,
        userType: 'buyer',
      })
      .then((response) => {
        // handle success
        props.setIsLoggedIn(true);
        console.log('response goooood');
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log('hit error response');
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  return (
    <div>
      <Paper elevation={6} className={classes.signupstack}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <h2> Log In </h2>
          <Stack spacing={2}>
            <TextField
              label=' Username / Email'
              variant='filled'
              // required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label='Password'
              variant='filled'
              type='password'
              // required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' variant='contained' color='primary'>
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}

/* 
<form className={classes.root} onSubmit={handleSubmit}>
      <h2>Buyer Login</h2>
      <TextField
        label=' Username / Email'
        variant='filled'
        // required
        value={nickName}
        onChange={(e) => setNickname(e.target.value)}
      />
      <TextField
        label='Password'
        variant='filled'
        type='password'
        // required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button type='submit' variant='contained' color='primary'>
          Log In
        </Button>
      </div>
    </form>
*/
