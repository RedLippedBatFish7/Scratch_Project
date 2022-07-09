import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Tooltip, Zoom } from '@material-ui/core';
import DiningIcon from '@material-ui/icons/LocalDining';
import { fontWeight } from '@mui/system';
import { Outlet, Link } from 'react-router-dom';
import SortIcon from '@material-ui/icons/Sort';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const useStyles = makeStyles((theme) => ({
  appbar: {
    color: 'red',
    backgroundColor: 'white',
    fontFamily: 'Lato',
  },
  appbarHead: {
    flexGrow: '1',
  },
  appbarWrap: {
    width: '90%',
    margin: '0 auto',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'black',
    margin: '10px',
    // fontSize: '4rem',
  },
  logoBlack: {
    color: '#2c3e50',
    fontWeight: '500',
    textDecoration: 'none',
  },
  logoRed: {
    color: '#e74c3c',
    fontWeight: '300',
  },
  noUnderline: {
    textDecoration: 'none',
    color: 'unset',
  },
}));

export default function Nav(props) {
  const classes = useStyles();

  let logOutIconElement;
  let myAccountIconElement;

  // if logout has been passed, it means we're signed in
  if (props.logOut) {
    logOutIconElement = (
      <Tooltip
        title={<h2 style={{ color: 'white' }}>Log Out</h2>}
        TransitionComponent={Zoom}
      >
        <IconButton onClick={props.logOut}>
          <LogoutIcon sx={{ fontSize: 33 }} className={classes.icon} />
        </IconButton>
      </Tooltip>
    );

    // if seller
    if (props.userType === 'seller')
      myAccountIconElement = (
        <Tooltip
          title={<h2 style={{ color: 'white' }}>My Kitchen</h2>}
          TransitionComponent={Zoom}
        >
          <IconButton component={Link} to='/MyKitchen'>
            <RestaurantMenuIcon
              sx={{ fontSize: 33 }}
              className={classes.icon}
            />
          </IconButton>
        </Tooltip>
      );
    else
      myAccountIconElement = (
        <Tooltip
          title={<h2 style={{ color: 'white' }}>My Account</h2>}
          TransitionComponent={Zoom}
        >
          <IconButton component={Link} to='/'>
            <ManageAccountsIcon
              sx={{ fontSize: 33 }}
              className={classes.icon}
            />
          </IconButton>
        </Tooltip>
      );
  }

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrap}>
          <Link to='/' className={classes.noUnderline}>
            <h1 className={classes.appbarHead}>
              <span className={classes.logoBlack}>Only</span>
              <span className={classes.logoRed}>Pans</span> <DiningIcon />
            </h1>
          </Link>
          <div>
            {myAccountIconElement}
            {logOutIconElement}
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
