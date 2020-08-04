import React, { Component } from 'react';
import ProductDataManager from '../../modules/ProductDataManager';
import './Products.css';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: { category: {} }
        };
    }

    componentDidMount() {
        // Get the product by its id
        ProductDataManager.getSingleProduct(this.props.productId)
            .then(product => {
                this.setState({ product: product });
            });
    }

    render() {
        return (
            <div className="ProductDetail__container">
                <h2 className="ProductDetail__header">{this.state.product.name}</h2>
                <p className="ProductDetail__description">{this.state.product.description}</p>
                <p className="ProductDetail__category">{this.state.product.category.name}</p>
                <p className="ProductDetail__price">$ {this.state.product.price}</p>
            </div>
        )
    }
}

export default ProductDetail;