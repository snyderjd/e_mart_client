import React, { Component } from 'react';
import ReviewDataManager from '../../modules/ReviewDataManager';
import ReviewCard from './ReviewCard';
import './Reviews.css';
import Cookies from 'universal-cookie';
import UserDataManager from '../../modules/UserDataManager';

class ReviewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserId: 0
    }
  }

  componentDidMount() {
    // If there is already a token in cookies, use it to get the current user and store in state
    const cookies = new Cookies();
    const token = cookies.get('token')

    if (token) {
      UserDataManager.getCurrentUser(token).then(user => {
        this.setState({ currentUserId: user.id });
      });
    }
  }

  render() {
    return (
      <div className="ReviewList__container">
        <h3>Reviews</h3>
        {this.props.reviews && this.props.reviews.map(review => 
          <ReviewCard 
            review={review} 
            currentUserId={this.state.currentUserId}
            deleteReview={this.props.deleteReview}
            updateReview={this.props.updateReview} 
            key={review.id} 
          />
        )}
      </div>
    )
  }
}

export default ReviewList;
