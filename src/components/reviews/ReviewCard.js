import React, { Component } from 'react';
import ReviewDataManager from '../../modules/ReviewDataManager';
import './Reviews.css';

class ReviewCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewerName: ""
    }
  }

  componentDidMount() {
    ReviewDataManager.getReview(this.props.review.id)
      .then(review => {
        this.setState({ reviewerName: review.reviewer_name });
      });
  }

  reviewDate() {
    const date = new Date(this.props.review.updated_at);
    const dateArray = date.toDateString().split(" ");
    const dateString = `${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
    return <p>{dateString}</p>
  }

  render() {
    return(
      <div className="ReviewCard__container">
        <h5 className="ReviewCard__title">{this.props.review.title}</h5>
        <h5>{this.props.review.rating} / 5</h5>
        {this.reviewDate()}
        <p>{this.state.reviewerName}</p>
        <p>{this.props.review.body}</p>
      </div>

    )
  }
}

export default ReviewCard;