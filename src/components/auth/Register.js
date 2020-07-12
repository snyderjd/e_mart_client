import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserDataManager from './UserDataManager';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirmPassword: "",
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    handleRegister = (event) => {
        // If inputs are valid, create a new user object and save to the DB
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match");
        } else {
            const newUserObject = {
                user: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: this.state.password
                }
            };

            UserDataManager.postUser(newUserObject).then(() => {
                this.props.history.push("/auth");
            }).then(this.toggle).then(() => {
                window.alert("Registration successful! Please Log In!");
            });
        }

    }

    toggle() {
        this.setState(prevState => ({
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirmPassword: "",
            modal: !prevState.modal
        }));
    }

    handleFieldChange = (event) => {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} color="success" >Register</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Register New Account</ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="Login-inputs">
                                <div className="Login-inputs-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input 
                                        onChange={this.handleFieldChange}
                                        type="text"
                                        id="first_name"
                                        value={this.state.first_name}
                                        placeholder="First name"
                                        required
                                        autofocus=""
                                        className="Login-input"
                                    />
                                </div>
                                <div className="Login-inputs-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input 
                                        onChange={this.handleFieldChange}
                                        type="text"
                                        id="last_name"
                                        value={this.state.last_name}
                                        placeholder="Last name"
                                        required
                                        className="Login-input"
                                    />
                                </div>
                                <div className="Login-inputs-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        onChange={this.handleFieldChange}
                                        type="email"
                                        id="email"
                                        value={this.state.email}
                                        placeholder="Email adddress"
                                        required
                                        className="Login-input"
                                    />
                                </div>
                                <div className="Login-inputs-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        onChange={this.handleFieldChange}
                                        type="password"
                                        id="password"
                                        value={this.state.password}
                                        placeholder="Password"
                                        required
                                        className="Login-input"
                                    />
                                </div>
                                <div className="Login-inputs-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input 
                                        onChange={this.handleFieldChange}
                                        type="password"
                                        id="confirmPassword"
                                        value={this.state.confirmPassword}
                                        placeholder="Confirm password"
                                        required
                                        className="Login-input"
                                    />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleRegister} color="success" >Register</Button>
                        <Button onClick={this.toggle} color="success" >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

export default Register;

// import React, { Component } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import UserDataManager from './UserDataManager';

// class Register extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             users: [],
//             email: "",
//             username: "",
//             password: "",
//             confirmPassword: "",
//             modal: false
//         };

//         this.toggle = this.toggle.bind(this);
//     }

//     handleRegister = (event) => {
//         // If inputs are valid, create new user object and save to the database
//         event.preventDefault();

//         if (this.state.password !== this.state.confirmPassword) {
//             alert("Passwords do not match.");
//         } else if (this.state.users.find(user => user.username === this.state.username)) {
//             alert("Username already taken.");
//         } else if (this.state.users.find(user => user.email === this.state.email)) {
//             alert("This email address is already associated with an account.")
//         } else {
//             const newUserObject = {
//                 email: this.state.email,
//                 username: this.state.username,
//                 password: this.state.password,
//                 skillsComplete: 0,
//                 timesCopied: 0
//             };

//             UserDataManager.postUser(newUserObject).then(() => {
//                 this.props.history.push("/auth");
//             }).then(this.toggle).then(() => {
//                 window.alert("Registration successful! Please Log In!")
//             });
//         }

//     }

//     toggle() {
//         this.setState(prevState => ({
//             modal: !prevState.modal
//         }))
//     }

//     handleFieldChange = (event) => {
//         const stateToChange = {};
//         stateToChange[event.target.id] = event.target.value;
//         this.setState(stateToChange);
//     }

//     componentDidMount() {
//         // get all users and set in state
//         UserDataManager.getAllUsers().then(users => {
//             this.setState({
//                 users: users
//             })
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <Button onClick={this.toggle} color="success" >Register</Button>
//                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
//                      <ModalHeader toggle={this.toggle}>Register New Account</ModalHeader>
//                      <ModalBody>
//                          <form>
//                             <div className="Login-inputs">
//                                 <div className="Login-inputs-group">
//                                     <label htmlFor="email">Email Address</label>
//                                     <input onChange={this.handleFieldChange} type="email"
//                                         id="email"
//                                         value={this.state.email}
//                                         placeholder="Email address"
//                                         required
//                                         autoFocus=""
//                                         className="Login-input"
//                                     />
//                                 </div>
//                                 <div className="Login-inputs-group">
//                                     <label htmlFor="username">Username</label>
//                                     <input onChange={this.handleFieldChange} type="text"
//                                         id="username"
//                                         value={this.state.username}
//                                         placeholder="Username"
//                                         required
//                                         className="Login-input"
//                                     />
//                                 </div>
//                                 <div className="Login-inputs-group">
//                                     <label htmlFor="password">Password</label>
//                                     <input onChange={this.handleFieldChange} type="password"
//                                         id="password"
//                                         value={this.state.password}
//                                         placeholder="Password"
//                                         required
//                                         className="Login-input"
//                                     />
//                                 </div>
//                                 <div className="Login-inputs-group">
//                                     <label htmlFor="confirmPassword">Confirm Password</label>
//                                     <input onChange={this.handleFieldChange} type="password"
//                                         id="confirmPassword"
//                                         value={this.state.confirmPassword}
//                                         placeholder="Confirm Password"
//                                         required
//                                         className="Login-input"
//                                     />
//                                 </div>
//                             </div>
//                         </form>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button onClick={this.handleRegister} color="success">Register</Button>{' '}
//                         <Button onClick={this.toggle} color="success">Cancel</Button>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         )
//     }

// }

// export default Register;