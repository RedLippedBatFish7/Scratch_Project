import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardContent, Paper, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { Stack } from '@mui/material';

const useStyles = makeStyles((theme) => ({
 signupstack: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    margin: '0px auto',
    left: '20%',
    right: '20%',
    zIndex: '1'
 }
}));

export default function Login() {

const classes = useStyles();

return (

<div>
   <Paper elevation={6} className={classes.signupstack}>
    <h2> Login </h2>
    <Stack spacing={2}>
    <TextField label={'Email'}/>
    <TextField label={'Password'}/>
    <Button color='primary'>Login</Button>
    </Stack>
   </Paper>
 </div>
)
}