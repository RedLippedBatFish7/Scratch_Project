import React, { Component } from 'react';
// import { Route, NavLink, HashRouter } from 'react-router-dom';
import Map from './components/map'
import Button from '@material-ui/core/Button'
import { CssBaseline, makeStyles } from '@material-ui/core';
// // import './stylesheets/styles.scss';

const useStyles = makeStyles((theme) => ({
    webmain: {
        minHeight: '100vh',
        backgroundColor: '#686de0',
        fontFamily: 'Roboto',
        color: 'white'
    }
}))

// create App
const App = () => {
    const classes = useStyles()
    return (
        
        <div className={classes.webmain} id='map'>
            <h1>Test</h1>
            <Button>Test</Button>
            <CssBaseline />
        </div>
        
    )
}
// export App
export default App;
