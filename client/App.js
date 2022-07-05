import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Map from './components/map';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register'

// // import './stylesheets/styles.scss';

// console.log('reading App.jsx');

// <div id='map'>
//     <Map/>
// </div> 

// create App
const App = () => {

    return (
        <>
          <Router>
            <div className = 'container'>
            <Header />
              <Routes>
                <Route path = '/login' element = {<Login/>}/>
                <Route path = '/register' element = {<Register/>}/>
                {/* <Route path = '/' element = {<Dashboard/>}/>
                <Route path = '/map' element = {<Map/>}/> */}
              </Routes>
            </div>
          </Router>
        </>
    )
}

// export App
export default App;
