import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

console.log('entered index.js');
render(
  <BrowserRouter>
    <h1>Header from App component</h1>
    {/* <App /> */}
  </BrowserRouter>,
  document.getElementById('app')
);
