import React, { Component } from 'react';
import ReviewDataManager from '../../modules/ReviewDataManager';
import ReviewCard from './ReviewCard';
import './Reviews.css';

class ReviewList extends Component {

  render() {
    console.log("ReviewList state:", this.state);
    return (
      <div className="ReviewList__container">
        <h3>Reviews</h3>
        {this.props.reviews && this.props.reviews.map(review => 
          <ReviewCard review={review} key={review.id} />
        )}
      </div>
    )
  }
}

export default ReviewList;
