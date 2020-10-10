import React, { Component } from 'react';
import ReviewDataManager from '../../modules/ReviewDataManager';
import './Reviews.css';

class ReviewCard extends Component {
  render() {
    return(
      <div className="ReviewCard__container">
        <h5 className="ReviewCard__title">{this.props.review.title}</h5>
        <h5>{this.props.review.rating}</h5>
        <p>{this.props.review.reviewer_name}</p>
        <p>{this.props.review.body}</p>
      </div>

    )
  }
}

export default ReviewCard;