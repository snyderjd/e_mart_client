import React, { Component } from 'react';
import ProductDataManager from '../../modules/ProductDataManager';
import { Button } from 'reactstrap';
import './Products.css';
import Cookies from 'universal-cookie';
import UserDataManager from '../../modules/UserDataManager';
import OrderDataManager from '../../modules/OrderDataManager';
import ReviewList from '../reviews/ReviewList';
import ReviewModal from '../reviews/ReviewModal';
import ReviewDataManager from '../../modules/ReviewDataManager';

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            category: {},
            currentUser: {},
            reviews: []
        };

        this.addReview = this.addReview.bind(this);
    }

    componentDidMount() {
        // Get the product by its id
        ProductDataManager.getSingleProduct(this.props.productId)
            .then(product => {
                this.setState({ 
                    product: product,
                    category: product.category,
                    reviews: product.reviews
                });
            });

        // If there is already a token in cookies, use it to get the current user and store in state
        const cookies = new Cookies();
        const token = cookies.get('token');

        if (token) {
            UserDataManager.getCurrentUser(token).then(user => {
                this.setState({ currentUser: user })
            });
        }
    }

    handleAddToCart = (event) => {
        event.preventDefault();
        const cookies = new Cookies();
        const activeOrderId = cookies.get('activeOrder').id;
        const productId = event.target.id;

        OrderDataManager.addProductToOrder(activeOrderId, productId);
    }

    addReview = (reviewObject) => {
        // Call API function that saves a new review to the database
        ReviewDataManager.createReview(reviewObject, this.props.productId)
            .then(review => {
                // Re-fetch the product from the database
                ProductDataManager.getSingleProduct(this.props.productId)
                    .then(product => {
                        this.setState({ 
                            product: product,
                            category: product.category,
                            reviews: product.reviews
                        });
                    });
            });
    }

    updateReview = (reviewObject, reviewId) => {
        // Call API function that updates a review
        ReviewDataManager.updateReview(reviewObject, reviewId)
            .then(review => {
                // Re-fetch the product from the database
                ProductDataManager.getSingleProduct(this.props.productId)
                    .then(product => {
                        this.setState({
                            product: product,
                            category: product.category,
                            reviews: product.reviews
                        });
                    });
            });
    }

    deleteReview = (reviewId) => {
        // Call API function that deletes the review, then re-fetch the product to update the ReviewList
        ReviewDataManager.deleteReview(reviewId)
            .then(review => {
                // Re-fetch the product from the database
                ProductDataManager.getSingleProduct(this.props.productId)
                    .then(product => {
                        this.setState({
                            product: product,
                            category: product.category,
                            reviews: product.reviews
                        });
                    });
            });
    }

    renderEditProductButton() {
        if (this.state.currentUser.role === "admin") {
            return  <Button
                        className="ProductDetail__button--editProduct"
                        onClick={() => this.props.history.push(`/products/${this.state.product.id}/edit`)}
                        color="primary">
                        Edit Product
                    </Button>
        }
    }

    renderAddToCartButton = () => {
        // If currentUser has an email address, they are an authorized user and should see the "Add To Cart" button
        if (this.state.currentUser.email) {
            return  <Button
                        className="ProductDetail__button--addToCart" 
                        id={this.state.product.id}
                        color="primary"
                        onClick={this.handleAddToCart}>
                        Add To Cart
                    </Button>
        }
    }

    renderReviewModal = () => {
        if (this.state.currentUser.email) {
            return  <ReviewModal  
                        addReview={this.addReview} 
                        currentUser={this.state.currentUser}
                        productId={this.props.productId}
                        {...this.props}
                    />
        }
    }

    renderReviewSummary = () => {
        const reviews = this.state.reviews;
        let sum = 0;
        reviews.forEach(review => sum += review.rating);
        const avgReview = sum / reviews.length;
        const formattedAvgReview = parseFloat(avgReview.toFixed(1));

        if (reviews.length > 0) {
            return <p>{formattedAvgReview} / 5 ({reviews.length})</p>
        } else {
            return <p>No reviews</p>
        }
    }

    render() {
        return (
            <div className="ProductDetail__container">
                <div className="ProductDetail__image-summary--container">
                    <div className="ProductDetail__image--container">
                        {this.state.product.image_url !== "No image" &&
                            <img alt={this.state.product.name} src={this.state.product.image_url}
                                height="400"
                                width="500"
                            >
                            </img>
                        }
                    </div>
                    <div className="ProductDetail__summary--container">
                        <h2 className="ProductDetail__header">{this.state.product.name}</h2>
                        <p className="ProductDetail__category">{this.state.category.name}</p>
                        {this.renderReviewSummary()}
                        <h3 className="ProductDetail__price">$ {this.state.product.price}</h3>
                        <div className="ProductDetail__buttons--container">
                            {this.renderEditProductButton()}
                            {this.renderAddToCartButton()}
                            {this.renderReviewModal()}
                        </div>
                    </div>
                </div>
                <div className="ProductDetail__description--container">
                    <h3>Description</h3>
                    <p className="ProductDetail__description">{this.state.product.description}</p>
                </div>
                <ReviewList 
                    productId={this.props.productId} 
                    reviews={this.state.reviews}
                    deleteReview={this.deleteReview}
                    updateReview={this.updateReview} 
                />
            </div>
        )
    }
}

export default ProductDetail;