import { counter } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import map from './components/map'


const container = document.getElementById('app')
const root = createRoot(container);
root.render(<App tab='home'/>)






//React 17 way old way
// const app = (
//   <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<App />}>
//     </Route>
//   </Routes>
//   </BrowserRouter>
// );

// render(app,document.getElementById('app'))


// console.log('entered index.js');
// render(
//   document.getElementById('app')
// );
