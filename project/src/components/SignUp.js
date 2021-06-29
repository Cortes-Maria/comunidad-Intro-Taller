import React, { Component } from 'react'
import { signInWithGoogle } from '../firebase';
import { auth } from '../firebase';
import { generateUserDocument } from '../firebase';


export default class SignUp extends Component {
    state = {
        isChecked: false,
        info : '',
        email: '',
        password: '',
        displayName: ''
      };

      handleChecked = this.handleChecked.bind(this);
     
      handleChange = date => {
        this.setState({
          startDate: date,
        });
        console.log()
      };

      

      handleChecked () {
        this.setState({isChecked: !this.state.isChecked});
        if(this.state.isChecked){
            this.setState({info : 1})
        }
        else{
            this.setState({info : 2}) 
        }
      }
    

    onChangeEmail= (e) => {
        this.setState({
            email: e.target.value
        })
        console.log(e.target.value)
    }
    onChangePassword= (e) => {
        this.setState({
            password: e.target.value
        })
        console.log(e.target.value)
    }

    onChangeDisplayName = (e) => {
        this.setState({
            displayName: e.target.value
        })
        console.log(e.target.value)
    }
 
    createUserWithEmailAndPasswordHandler = async (event, email, password, displayName) => {
        event.preventDefault();
        try{
          const {user} = await auth.createUserWithEmailAndPassword(email, password);
          generateUserDocument(user, {displayName});
        }
        catch(error){
          console.log('Error Signing up with email and password');
        }
    
        this.setState({
            email: "",
            password: ""
        })
      };

    render() {
        return (
            <div className="col-md-6 offset-md-3 mt-5 mb-5">
            <div className="card card-body">
                <h4 className="text-center">Registrarse</h4>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            required="required"
                            onChange = {this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="displayName"
                            placeholder="Username"
                            required="required"
                            onChange = {this.onChangeDisplayName}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            required="required"
                            onChange = {this.onChangePassword}
                        />
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <button type="submit" className="btn btn-primary"
                                onClick={event => {
                                    this.createUserWithEmailAndPasswordHandler(event, this.state.email, this.state.password, this.state.displayName);
                                }}>
                                Registrar
                            </button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                            <div className="col-md-12"> 
                                <a className="btn btn-lg btn-google btn-block btn-outline" style={{color: 'black'}} onClick={signInWithGoogle}><img alt="" src="https://img.icons8.com/color/16/000000/google-logo.png"></img> Inicia con Google</a> 
                            </div>
                    </div>

                </form>
                
            </div>
        </div>
        )
    }
}
