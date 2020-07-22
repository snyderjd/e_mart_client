import React, { Component } from 'react';
import './Products.css';

class ProductCard extends Component {
    inStock() {
        if (this.props.product.quantity >= 0) {
            return "In Stock"
        } else {
            return "Out of Stock"
        }
    }
    
    // Render a product, showing it's basic information on the ProductList component
    render() {
        return (
            <React.Fragment>
                <div className="product-card">
                    <h3 className="ProductCard-heading">{this.props.product.name}</h3>
                    <p>Description: {this.props.product.description}</p>
                    <p>Category: {this.props.product.category.name}</p>
                    <p>Price: ${this.props.product.price}</p>
                    <p>Quantity In Stock: {this.props.product.quantity}</p>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductCard;