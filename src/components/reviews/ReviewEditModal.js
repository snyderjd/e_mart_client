import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReviewDataManager from '../../modules/ReviewDataManager';
import './Reviews.css';

class ReviewEditModal extends Component {
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

  componentDidMount() {
    // Get the review from the database and set editable properties in state
    ReviewDataManager.getReview(this.props.reviewId)
      .then(review => {
        this.setState({
          rating: review.rating,
          title: review.title,
          body: review.body
        });
      });
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
    this.setState(newState);
  }

  buildUpdatedReview = (event) => {
    event.preventDefault();

    // Uses the values in state to build review object and calls function in props to update the review, passing in the review object

    if (this.state.title !== "") {
      const updatedReview = {
        review: {
          rating: this.state.rating,
          title: this.state.title,
          body: this.state.body
        }
      }

      // Call function passed down from ProductDetail
      this.props.updateReview(updatedReview);
      this.toggle();

    } else {
      window.alert("Please enter a review title.");
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} color="primary">Edit</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>Edit Review</ModalHeader>
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
                <div className="Review-inputs">
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
            <Button onClick={this.toggle} color="danger">Cancel</Button>
            <Button onClick={this.buildUpdatedReview} color="primary">Submit</Button>
          </ModalFooter>
        </Modal>
      </div>

    )
  }

}

export default ReviewEditModal;

// import React, { Component } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import './Reviews.css';

// class ReviewModal extends Component {
//   constructor(props) {

//   }

//   buildNewReview = (event) => {
//     event.preventDefault();
//     // Uses the values in state to build review object and calls function in props to add the review, passing in the review object

//     if (this.state.title !== "") {
//       const newReview = {
//         review: {
//           rating: this.state.rating,
//           title: this.state.title,
//           body: this.state.body 
//         }
//       }

//       // Call function passed down from ProductDetail
//       this.props.addReview(newReview);
//       this.toggle();

//     } else {
//       window.alert("Please enter a review title.");
//     }

//   }

//   render() {
//     console.log("ReviewModal props:", this.props);
//     return (
//       <div>
//         <Button onClick={this.toggle} color="primary">Add Review</Button>
//         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
//           <ModalHeader>Add a Review</ModalHeader>
//           <ModalBody>
//             <form>
//               <div className="Review-inputs">
//                 <div className="Review-inputs-group">
//                   <label htmlFor="rating">Rating</label>
//                   <select 
//                     id="rating" 
//                     value={this.state.rating} 
//                     onChange={this.handleFieldChange}
//                     className="Review-input">
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5">5</option>
//                   </select>
//                 </div>
//                 <div className="Review-inputs-group">
//                   <label htmlFor="title">Title</label>
//                   <input onChange={this.handleFieldChange} 
//                     type="text"
//                     id="title"
//                     value={this.state.title}
//                     placeholder="Title"
//                     required
//                     className="Review-input"
//                   />
//                 </div>
//                 <div className="Review-inputs-group">
//                   <label htmlFor="body">Review</label>
//                   <textarea 
//                     onChange={this.handleFieldChange} 
//                     id="body" 
//                     rows="4" 
//                     cols="50"
//                     className="Review-input">
//                   </textarea>
//                 </div>
//               </div>            
//             </form>
//           </ModalBody>
//           <ModalFooter>
//             <Button onClick={this.toggle} color="primary">Cancel</Button>
//             <Button onClick={this.buildNewReview} color="primary">Submit</Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     )

//   }

// }

// export default ReviewModal;