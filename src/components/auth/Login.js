import React, { Component } from 'react';
import UserDataManager from '../../modules/UserDataManager';
import { Button } from 'reactstrap';
import Register from './Register';
import './Auth.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleFieldChange = (event) => {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    }

    handleLogin = (event) => {
        event.preventDefault();
        const authObject = {
            "auth": {
                "email": this.state.email,
                "password": this.state.password
            }
        }

        this.props.login(authObject);
        this.props.history.push("/products");
        this.setState({ email: "", password: "" })
    }

    render() {
        return (
            <React.Fragment>
                <div className="Login-container">
                    <form onSubmit={this.handleLogin} className="Login-form">
                        <h3 className="Login-heading">Please Log In or Register</h3>
                        <div className="Login-inputs">
                            <div className="Login-inputs-group">
                                <label className="Login-label" htmlFor="email">Email</label>
                                <input 
                                    className="Login-input"
                                    onChange={this.handleFieldChange}
                                    id="email"
                                    type="email"
                                    value={this.state.email}
                                    placeholder="Email address"
                                    required
                                    autoFocus=""
                                />
                            </div>
                            <div className="Login-inputs-group">
                                <label className="Login-label" htmlFor="password">Password</label>
                                <input 
                                    className="Login-input"
                                    onChange={this.handleFieldChange}
                                    id="password"
                                    value={this.state.password}
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="Login-buttons">
                            <Button color="primary" type="submit">Sign In</Button>{' '}
                            <Register {...this.props} />
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;