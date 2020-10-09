import React, { Component } from 'react';
import ReviewDataManager from '../../modules/ReviewDataManager';
import ReviewCard from './ReviewCard';
import './Reviews.css';

class ReviewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    }
  }

  componentDidMount() {
    // Get product's reviews and store in state
    ReviewDataManager.getProductReviews(this.props.productId)
      .then(reviews => {
        this.setState({ reviews: reviews });
      });
  }

  render() {
    console.log("ReviewList state:", this.state);
    return (
      <div className="ReviewList__container">
        <h3>Reviews</h3>
        {this.state.reviews && this.state.reviews.map(review => 
          <ReviewCard review={review} key={review.id} />
        )}
      </div>
    )
  }
}

export default ReviewList;
