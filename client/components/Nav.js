import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SortIcon from '@material-ui/icons/Sort'
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import DiningIcon from '@material-ui/icons/LocalDining';
import { fontWeight } from '@mui/system';

const useStyles = makeStyles((theme) => ({
 appbar:{
    color: 'red',
    backgroundColor: 'white',
    fontFamily: 'Lato'
 },
 appbarHead: {
    flexGrow: '1'
 },
 appbarWrap: {
    width: '90%',
    margin: '0 auto'
 },
 icon: {
    color: 'black',
    fontSize: '2rem'
 },
 logoBlack: {
    color: '#2c3e50',
    fontWeight: '500'
 },
 logoRed: {
    color: '#e74c3c',
    fontWeight: '300'
 }
}));

export default function Nav() {

const classes = useStyles();

return (

    <div>
        <AppBar className={classes.appbar} elevation={0}>
            <Toolbar className={classes.appbarWrap}>
            <h1 className={classes.appbarHead}><span className={classes.logoBlack}>Only</span><span className={classes.logoRed}>Pans</span> <DiningIcon/></h1>
            <IconButton>
                <SortIcon className={classes.icon}/>
            </IconButton>
            </Toolbar>
        </AppBar>
 
    </div>
)
}