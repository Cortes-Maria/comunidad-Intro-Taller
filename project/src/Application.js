import React from "react";
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
import { UserContext } from "./providers/UserProvider";
function Application() {
    //const user = null;
    

    return (
    <UserContext.Consumer>
        {   user =>        
        
                    user  ?
                    <Router>
                        <Navigation/>
                        <Home isAdmin={true}/>
                    </Router> 
                   
                    :
                    <Router>
                        <Navigation/>
                        <Route path="/login" exact component={Login} />
                        <Route path="/" exact component={Home}/>
                        <Route path="/alertas" component={Alertas}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/zones" component={Zonas}/>
                        <Route path="/history" component={Historial}/>
                    </Router>
        }
    </UserContext.Consumer>
  
    );
}
export default Application;
