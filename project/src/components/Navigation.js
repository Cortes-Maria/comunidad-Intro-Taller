import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import { auth } from '../firebase';


class Navigation extends Component {

    refreshPage() {
        localStorage.clear()
        window.location.href = "/"
      }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        IC
                    </Link>
                    <Link className="navbar-brand" to="/">
                        Home
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li>
                                <Link className="navbar-brand" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <button  className="btn btn-dark" type="button"  onClick={() => auth.signOut()}>
                                    Log Out
                                </button>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;