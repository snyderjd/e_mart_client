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
    return <p>{dateString}</p>
  }

  handleDeleteReview = (event) => {
    event.preventDefault();
    const deleteConfirmed = window.confirm("Are you sure you want to delete this review?");
    
    if (deleteConfirmed) {
      console.log("delete the review");
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
      return  <ReviewEditModal reviewId={this.props.review.id} />
    }
  }

  render() {
    console.log("ReviewCard state", this.state);
    console.log("ReviewCard props", this.props);
    return(
      <div className="ReviewCard__container">
        <h5 className="ReviewCard__title">{this.props.review.title}</h5>
        <h5>{this.props.review.rating} / 5</h5>
        {this.reviewDate()}
        <p>{this.state.reviewerName}</p>
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