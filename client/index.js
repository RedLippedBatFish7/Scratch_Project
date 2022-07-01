import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import map from './components/map'

const app = (
  <BrowserRouter>
  <App/>
  </BrowserRouter>
);

render(app,document.getElementById('app'))


// console.log('entered index.js');
// render(
//   document.getElementById('app')
// );
