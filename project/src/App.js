import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Login from '../src/components/Login'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Alertas from './components/Alertas'
import SignUp from './components/SignUp'
import Zonas from './components/Zonas'
import Historial from './components/Historial'

function App() {
  return (
   <Router>
      <Navigation/>
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Home}/>
      <Route path="/alertas" component={Alertas}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/zones" component={Zonas}/>
      <Route path="/history" component={Historial}/>
   </Router>
  );
}

export default App;
