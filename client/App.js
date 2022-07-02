import React, { Component } from 'react';
// import { Route, NavLink, HashRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { CssBaseline, makeStyles } from '@material-ui/core';
import Nav from './components/Nav';
import Body from './components/Body';
// // import './stylesheets/styles.scss';

const useStyles = makeStyles((theme) => ({
    webmain: {
        backgroundColor: '#686de0',
        color: 'black'
    }
}))

// create App
const App = () => {
    const classes = useStyles()
    return (
        <div className={classes.webmain}>
            <CssBaseline />
            <Nav/>
            <Button>Test</Button>
            <Body />
        </div>
        
    )
}
// export App
export default App;
