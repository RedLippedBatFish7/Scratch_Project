import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './components/map'
import Dashboard from './pages/Dashboard'

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
              <Routes>
                <Route path = '/' element = {<Dashboard/>}/>
                <Route path = '/login' element = {<Element2/>}/>
                <Route path = '/register' element = {<Element3/>}/>
                <Route path = '/map' element = {<Map/>}/>
              </Routes>
            </div>
          </Router>
        </>
    )
}

// export App
export default App;
