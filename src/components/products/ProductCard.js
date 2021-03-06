import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Products.css';
import Cookies from 'universal-cookie';
import OrderDataManager from '../../modules/OrderDataManager';

class ProductCard extends Component {
    inStock() {
        if (this.props.product.quantity >= 0) {
            return "In Stock"
        } else {
            return "Out of Stock"
        }
    }

    handleViewProduct = (event) => {
        event.preventDefault();
        this.props.history.push(`/products/${this.props.product.id}`)
    }

    handleAddToCart = (event) => {
        event.preventDefault();
        const cookies = new Cookies();
        const activeOrderId = cookies.get('activeOrder').id;
        const productId = event.target.id;

        OrderDataManager.addProductToOrder(activeOrderId, productId);
    }

    renderReviewSummary = () => {
        const reviews = this.props.product.reviews;
        const numReviews = reviews.length;
        let sum = 0;
        reviews.forEach(review => sum += review.rating);
        const avgReview = sum / numReviews;
        const formattedAvgReview = parseFloat(avgReview.toFixed(1));

        if (numReviews > 0) {
            if (avgReview < 1.5) {
                return <h5>&#9733;&#9734;&#9734;&#9734;&#9734; {formattedAvgReview} ({numReviews})</h5>
            } else if (avgReview < 2.5) {
                return <h5>&#9733;&#9733;&#9734;&#9734;&#9734; {formattedAvgReview} ({numReviews})</h5>
            } else if (avgReview < 3.5) {
                return <h5>&#9733;&#9733;&#9733;&#9734;&#9734; {formattedAvgReview} ({numReviews})</h5>
            } else if (avgReview < 4.5) {
                return <h5>&#9733;&#9733;&#9733;&#9733;&#9734; {formattedAvgReview} ({numReviews})</h5>
            } else {
                return <h5>&#9733;&#9733;&#9733;&#9733;&#9733; {formattedAvgReview} ({numReviews})</h5>
            }
        } else {
            return <p>No reviews</p>
        }
    }

    renderAddToCartButton = () => {
        //   If currentUser in props has an email address, they are an authorized user and should see the "Add To Cart" button
        if (this.props.currentUser.email) {
            return  <Button 
                        id={this.props.product.id} 
                        color="primary"
                        onClick={this.handleAddToCart}
                        >Add To Cart
                    </Button>
        }  
    }
    
    // Render a product, showing it's basic information on the ProductList component
    render() {
        return (
            <div className="ProductCard__container">
                <div className="ProductCard__body">
                    {this.props.product.image_url !== "No image" &&
                        <img alt="Product image" src={this.props.product.image_url}
                            height="200"
                            width="200"
                        >
                        </img>
                    }
                    <h3 className="ProductCard-heading">{this.props.product.name}</h3>
                    <h4>${this.props.product.price}</h4>
                    {this.renderReviewSummary()}
                </div>
                <div className="ProductCard__buttons--container">
                    <Button onClick={this.handleViewProduct} color="primary">View Product</Button>
                    {this.renderAddToCartButton()}    
                </div>
            </div>        
        )
    }
}

export default ProductCard;
