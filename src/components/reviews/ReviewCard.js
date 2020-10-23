import React, { Component } from 'react';
import { Button } from 'reactstrap';
import ReviewDataManager from '../../modules/ReviewDataManager';
import ReviewEditModal from './ReviewEditModal';
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

  reviewDate = () => {
    const date = new Date(this.props.review.updated_at);
    const dateArray = date.toDateString().split(" ");
    const dateString = `${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
    return <p className="ReviewCard__header--item">{dateString}</p>
  }

  handleDeleteReview = (event) => {
    event.preventDefault();
    const deleteConfirmed = window.confirm("Are you sure you want to delete this review?");
    
    if (deleteConfirmed) {
      this.props.deleteReview(this.props.review.id);
    }
  }

  renderDeleteButton = () => {
    if (this.props.currentUserId === this.props.review.user_id) {
      return  <Button
                color="danger"
                onClick={this.handleDeleteReview}>
                Delete
              </Button>
    }
  }

  renderEditButton = () => {
    if (this.props.currentUserId === this.props.review.user_id) {
      return  <ReviewEditModal reviewId={this.props.review.id} updateReview={this.props.updateReview} />
    }
  }

  renderReviewRating = () => {
    const rating = this.props.review.rating;

    if (rating === 1) {
      return <h5 className="ReviewCard__header--item">&#9733;&#9734;&#9734;&#9734;&#9734;</h5>
    } else if (rating === 2) {
      return <h5 className="ReviewCard__header--item">&#9733;&#9733;&#9734;&#9734;&#9734;</h5>
    } else if (rating === 3) {
      return <h5 className="ReviewCard__header--item">&#9733;&#9733;&#9733;&#9734;&#9734;</h5>
    } else if (rating === 4) {
      return <h5 className="ReviewCard__header--item">&#9733;&#9733;&#9733;&#9733;&#9734;</h5>
    } else {
      return <h5 className="ReviewCard__header--item">&#9733;&#9733;&#9733;&#9733;&#9733;</h5>
    }
  }

  render() {
    return(
      <div className="ReviewCard__container">
        <div className="ReviewCard__header">
          {this.renderReviewRating()}
          <p className="ReviewCard__header--item">{this.state.reviewerName}</p>
          {this.reviewDate()}
        </div>
        <h5 className="ReviewCard__title">{this.props.review.title}</h5>
        <p>{this.props.review.body}</p>
        <div className="ReviewCard__buttons--container">
          {this.renderDeleteButton()}
          {this.renderEditButton()}
        </div>
      </div>
    )
  }
}

export default ReviewCard;