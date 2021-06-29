import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { signInWithGoogle } from '../firebase';
import { auth } from '../firebase';

export default class Login extends Component {

    
    state = {
        email: '',
        pass: ''
    };


    onChangeEmail= (e) => {
        this.setState({
            email: e.target.value
        })
        console.log(e.target.value)
    }

    onChangePassword= (e) => {
        this.setState({
            pass: e.target.value
        })
        console.log(e.target.value)
    }

    onSubmit =  async e => {
        e.preventDefault();
        window.location.href = "/alertas"
    }

    signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
          console.error("Error signing in with password and email", error);
        });
    };

    render() {
        return (
           <div className="col-md-6 offset-md-3 mt-5 mb-5">
               <div className="card card-body">
                   <h4 className="text-center">Iniciar sesion</h4>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" placeholder="Email" required="required" onChange={this.onChangeEmail}/>			
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password" required="required"  onChange = {this.onChangePassword} />
                    </div>
                   <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-dark mb-2" onClick={event => {
                            this.signInWithEmailAndPasswordHandler(event, this.state.email, this.state.pass);
                        }}>
                            Acceder
                        </button>
                   </form>
                    <hr></hr>
                   <div className="row">
                        <div className="col-md-12"> 
                            <a className="btn btn-lg btn-google btn-block btn-outline" style={{color: 'black'}} onClick={signInWithGoogle}><img alt="" src="https://img.icons8.com/color/16/000000/google-logo.png"></img> Inicia con Google</a> 
                        </div>
                    </div>
                   
               </div>
               <div className="modal-footer">
				        ¿Nuevo? 
                        <Link to="/signup">
                        Registrate
                        </Link>
			    </div>  
           </div>
        )
    }
}
