import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Order.css';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="Cart__container">
        <h1>Cart</h1>
      </div>
    )
  }
}

export default Cart;

// class ProductCard extends Component {
//     handleViewProduct = (event) => {
//         event.preventDefault();
//         this.props.history.push(`/products/${this.props.product.id}`)
//     }
    
//     // Render a product, showing it's basic information on the ProductList component
//     render() {
//         return (
//             <div className="ProductCard__container">
//                 <h3 className="ProductCard-heading">{this.props.product.name}</h3>
//                 <p>Description: {this.props.product.description}</p>
//                 <p>Category: {this.props.product.category.name}</p>
//                 <p>Price: ${this.props.product.price}</p>
//                 <p>Quantity In Stock: {this.props.product.quantity}</p>
//                 <Button onClick={this.handleViewProduct} color="primary">View Product</Button>
//             </div>
//         )
//     }
// }

// export default ProductCard;