import React, { Component } from 'react';
import ProductDataManager from '../../modules/ProductDataManager';
import { Button } from 'reactstrap';
import './Products.css';
import Cookies from 'universal-cookie';
import UserDataManager from '../../modules/UserDataManager';

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

    renderEditProductButton() {
        if (this.state.currentUser.role === "admin") {
            return  <Button
                        onClick={() => this.props.history.push(`/products/${this.state.product.id}/edit`)}
                        color="primary">
                        Edit Product
                    </Button>
        }
    }

    render() {
        console.log("ProductDetail state", this.state);
        return (
            <div className="ProductDetail__container">
                <h2 className="ProductDetail__header">{this.state.product.name}</h2>
                <p className="ProductDetail__description">{this.state.product.description}</p>
                <p className="ProductDetail__category">{this.state.product.category.name}</p>
                <p className="ProductDetail__price">$ {this.state.product.price}</p>
                {this.renderEditProductButton()}
            </div>
        )
    }
}

export default ProductDetail;