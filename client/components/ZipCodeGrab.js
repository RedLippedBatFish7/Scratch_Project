import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Stack } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '20px',
  },
}));
export default function ZipCodeGrab(props) {
  const classes = useStyles();
  //grabs Zipcode from text field
  const [UserZip, setUserZip] = useState(0);
  //tracks errors if incorrect zipcode format is entered
  const [ErrorZip, setErrorZip] = useState(false);

  //store userid in state

  const submitZipCode = (e) => {
    const zipRegex = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
    console.log();
    e.preventDefault();
    if (zipRegex.test(UserZip)) {
      console.log('Accepted!');
      setErrorZip(false);

      //Post request, send entered field to server
      //let token = localStorage.getItem("token");
      //axios.defaults.headers.common["Authorization"] = token;
      //   axios.defaults.withCredentials = true;

      axios
        .post('/auth/zipcode', {
          zipcode: UserZip,
          withCredentials: true,
        })
        .then((response) => {
          console.log('Response from server is', response);
          props.setUserZip(UserZip);
          document.cookie = `userZip=${UserZip}`;
        });
    } else {
      //Error handling if zipcode is not 5 Digits (sorry Canada)
      setErrorZip(true);
    }
  };

  return (
    <div>
      <Paper elevation={5} sx={{ p: 2 }} className={classes.paper}>
        <h1>Which neighborhood are you located in?</h1>
        <form onSubmit={submitZipCode}>
          <Stack spacing={2}>
            <TextField
              id='outlined-basic'
              label='Zipcode'
              variant='outlined'
              type='number'
              error={ErrorZip}
              helperText={
                ErrorZip == true ? 'Please enter a valid Zipcode' : false
              }
              onChange={(e) => setUserZip(e.target.value)}
            />
            <Button color='primary' variant='contained' type='submit'>
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
