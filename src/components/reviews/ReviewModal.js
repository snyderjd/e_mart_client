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
    // Opens/closes the modal and resets state
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

    if (this.state.title !== "") {
      const newReview = {
        review: {
          rating: this.state.rating,
          title: this.state.title,
          body: this.state.body 
        }
      }

      // Call function passed down from ProductDetail
      this.props.addReview(newReview);
      this.toggle();

    } else {
      window.alert("Please enter a review title.");
    }

  }

  render() {
    console.log("ReviewModal props:", this.props);
    return (
      <div>
        <Button onClick={this.toggle} color="primary">Add Review</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>Add a Review</ModalHeader>
          <ModalBody>
            <form>
              <div className="Review-inputs">
                <div className="Review-inputs-group">
                  <label htmlFor="rating">Rating</label>
                  <select 
                    id="rating" 
                    value={this.state.rating} 
                    onChange={this.handleFieldChange}
                    className="Review-input">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </select>
                </div>
                <div className="Review-inputs-group">
                  <label htmlFor="title">Title</label>
                  <input onChange={this.handleFieldChange} 
                    type="text"
                    id="title"
                    value={this.state.title}
                    placeholder="Title"
                    required
                    className="Review-input"
                  />
                </div>
                <div className="Review-inputs-group">
                  <label htmlFor="body">Review</label>
                  <textarea 
                    onChange={this.handleFieldChange} 
                    id="body" 
                    rows="4" 
                    cols="50"
                    className="Review-input">
                  </textarea>
                </div>
              </div>            
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.toggle} color="primary">Cancel</Button>
            <Button onClick={this.buildNewReview} color="primary">Submit</Button>
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