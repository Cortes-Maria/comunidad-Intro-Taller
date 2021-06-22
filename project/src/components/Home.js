import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import cne_logo from '../assets/cne_logo.png'

class Home extends Component {

    

    render() {
        return (
           <div>
               <h4 style={{marginTop: 20}} className="text-center">Algoritmos</h4>
           </div>
        );
    }
}

export default Home;