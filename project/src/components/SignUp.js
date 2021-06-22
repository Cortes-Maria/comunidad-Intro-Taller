import React, { Component } from 'react'
import axios from 'axios'

export default class SignUp extends Component {
    state = {
        isChecked: false,
        info : '',
        email: '',
        password: '',
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
 

    onSubmit =  async e => {
        e.preventDefault();
        window.location.href = "/alertas"
    }

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
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            required="required"
                            onChange = {this.onChangePassword}
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
                            <button type="submit" className="btn btn-primary">
                                Registrar
                            </button>
                        </div>
                    </div>

                </form>
                
            </div>
        </div>
        )
    }
}
