import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReviewDataManager from '../../modules/ReviewDataManager';
import './Reviews.css';

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      title: "",
      body: "",
      modal: false      
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      rating: 1,
      title: "",
      body: "",
      modal: !prevState.modal
    }));
  }

  handleFieldChange = (event) => {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState)
  }

  buildNewReview = (event) => {
    event.preventDefault();
    // Uses the values in state to build review object and calls function in props to add the review, passing in the review object
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} color="primary">Add Review</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>Add a Review</ModalHeader>
          <ModalBody>
            <form>
              
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.toggle} color="primary">Cancel</Button>
            <Button color="primary">Register</Button>
          </ModalFooter>
        </Modal>
      </div>
    )

  }

}

export default ReviewModal;

// import React, { Component } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import UserDataManager from '../../modules/UserDataManager';

// class Register extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             first_name: "",
//             last_name: "",
//             password: "",
//             confirmPassword: "",
//             modal: false
//         };

//         this.toggle = this.toggle.bind(this);
//     }

//     handleRegister = (event) => {
//         // If inputs are valid, create a new user object and save to the DB
//         if (this.state.password !== this.state.confirmPassword) {
//             alert("Passwords do not match");
//         } else {
//             const newUserObject = {
//                 user: {
//                     first_name: this.state.first_name,
//                     last_name: this.state.last_name,
//                     email: this.state.email,
//                     password: this.state.password
//                 }
//             };

//             UserDataManager.postUser(newUserObject).then(() => {
//                 this.props.history.push("/auth");
//             }).then(this.toggle).then(() => {
//                 window.alert("Registration successful! Please Log In!");
//             });
//         }

//     }

//     toggle() {
//         this.setState(prevState => ({
//             email: "",
//             first_name: "",
//             last_name: "",
//             password: "",
//             confirmPassword: "",
//             modal: !prevState.modal
//         }));
//     }

//     handleFieldChange = (event) => {
//         const newState = {};
//         newState[event.target.id] = event.target.value;
//         this.setState(newState)
//     }

//     componentDidMount() {

//     }

//     render() {
//         return (
//             <div>
//                 <Button onClick={this.toggle} color="primary" >Register</Button>
//                 <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
//                     <ModalHeader toggle={this.toggle}>Register New Account</ModalHeader>
//                     <ModalBody>
//                         <form>
//                             <div className="Login-inputs">
//                                 <div className="Login-inputs-group">
//                                     <label htmlFor="email">Email Address</label>
//                                     <input
//                                         onChange={this.handleFieldChange}
//                                         type="email"
//                                         id="email"
//                                         value={this.state.email}
//                                         placeholder="Email adddress"
//                                         required
//                                         className="Login-input"
//                                     />
//                                 </div>
//                             </div>
//                         </form>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button onClick={this.handleRegister} color="primary" >Register</Button>
//                         <Button onClick={this.toggle} color="primary" >Cancel</Button>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         )
//     }

// }

// export default Register;