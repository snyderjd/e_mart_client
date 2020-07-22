import React, { Component } from 'react';
import UserDataManager from './UserDataManager';
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
        this.props.history.push("/");
        this.setState({ email: "", password: "" })
    }

    componentDidMount() {

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
                            <Button color="success" type="submit">Sign In</Button>{' '}
                            <Register {...this.props} />
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;

// import React, { Component } from 'react';
// import UserDataManager from './UserDataManager';
// import { Button } from 'reactstrap';
// import Register from './Register';
// import './Auth.css';

// class Login extends Component {
//     state = {
//         email: "",
//         password: "",
//         users: []
//     };

//     handleFieldChange = (event) => {
//         const newState = {};
//         newState[event.target.id] = event.target.value;
//         this.setState(newState);
//     }

//     handleLogin = (event) => {
//         event.preventDefault();
//         // Check database for user with email and password that matches the inputs
//         UserDataManager.checkUsers(this.state.email, this.state.password).then(checkedUsers => {
//             if (checkedUsers.length > 0) {
//                 sessionStorage.setItem("activeUserId", checkedUsers[0].id)
//                 this.props.history.push("/skills");
//                 this.props.login();
//             } else {
//                 alert("Invalid email or password.");
//             }
//         })
//     }

//     componentDidMount() {
//         // get all users and store in state
//         UserDataManager.getAllUsers().then(users => {
//             this.setState({
//                 users: users
//             });
//         });
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <div className="Login-container">
//                     <form onSubmit={this.handleLogin} className="Login-form">
//                         <h3 className="Login-heading">Please Log In Or Register</h3>
//                         <div className="Login-inputs">
//                             <div className="Login-inputs-group">
//                                 <label className="Login-label" htmlFor="email">Email</label>
//                                 <input
//                                     className="Login-input"
//                                     onChange={this.handleFieldChange}
//                                     id="email"
//                                     type="email"
//                                     value={this.state.email}
//                                     placeholder="Email address"
//                                     required
//                                     autoFocus=""
//                                 />
//                             </div>
//                             <div className="Login-inputs-group">
//                                 <label className="Login-label" htmlFor="password">Password</label>
//                                 <input
//                                     className="Login-input"
//                                     onChange={this.handleFieldChange}
//                                     id="password"
//                                     value={this.state.password}
//                                     type="password"
//                                     placeholder="Password"
//                                     required 
//                                 />
//                             </div>
//                         </div>
//                         <div className="Login-buttons">
//                             <Button color="success" type="submit">Sign In</Button>{' '}
//                             <Register {...this.props} />
//                         </div>                            
//                     </form>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }

// export default Login;