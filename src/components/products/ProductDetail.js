import React, { Component } from 'react';
import ProductDataManager from '../../modules/ProductDataManager';
import { Button } from 'reactstrap';
import './Products.css';
import Cookies from 'universal-cookie';
import UserDataManager from '../../modules/UserDataManager';
import OrderDataManager from '../../modules/OrderDataManager';
import ReviewList from '../reviews/ReviewList';
import ReviewModal from '../reviews/ReviewModal';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: { category: {} },
            currentUser: {}
        };
    }

    componentDidMount() {
        // Get the product by its id
        ProductDataManager.getSingleProduct(this.props.productId)
            .then(product => {
                this.setState({ product: product });
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
        // Re-fetches the product from the database
    }

    renderEditProductButton() {
        if (this.state.currentUser.role === "admin") {
            return  <Button
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
                        id={this.state.product.id}
                        color="primary"
                        onClick={this.handleAddToCart}>
                        Add To Cart
                    </Button>
        }
    }

    renderReviewModal = () => {
        if (this.state.currentUser.email) {
            return  <ReviewModal {...this.props} addReview={this.addReview} />
        }
    }

    render() {
        console.log("ProductDetail state", this.state);
        return (
            <div className="ProductDetail__container">
                <h2 className="ProductDetail__header">{this.state.product.name}</h2>
                {this.state.product.image_url !== "No image" &&
                        <img alt="Product image" src={this.state.product.image_url}
                            height="300"
                            width="400"
                        >
                        </img>
                    }
                <p className="ProductDetail__description">{this.state.product.description}</p>
                <p className="ProductDetail__category">{this.state.product.category.name}</p>
                <p className="ProductDetail__price">$ {this.state.product.price}</p>
                <div className="ProductDetail__buttons--container">
                    {this.renderEditProductButton()}
                    {this.renderAddToCartButton()}
                </div>
                {this.renderReviewModal()}
                <ReviewList productId={this.props.productId} />
            </div>
        )
    }
}

export default ProductDetail;