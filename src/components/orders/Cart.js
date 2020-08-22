import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import OrderDataManager from '../../modules/OrderDataManager';
import './Orders.css';

// import Cookies from 'universal-cookie';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOrderId: 0,
      activeOrder: {}
    };
  }

  componentDidMount() {
    // Use the id of the user's active order to get the current active order from the database
    const cookies = new Cookies();
    const activeOrderId = cookies.get('activeOrder').id;

    this.setState({ activeOrderId: activeOrderId });

    OrderDataManager.getOrder(activeOrderId)
      .then(activeOrder => {
        this.setState({ activeOrder })
      });

  }

  render() {
    console.log("Cart state", this.state);
    return (
      <div className="Cart__container">
        <h1>Cart</h1>
        <table className="Cart__products--table">
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Cost</th>
          </tr>
          {this.state.activeOrder.products ? this.state.activeOrder.products.map(product =>
            <tr>
              <td>{product.name}</td>
              <td>{product.description.slice(0, 40)}...</td>
              <td>$ {product.price}</td>
              <Button color="danger">Remove</Button>
            </tr>
          ) : ""}
        </table>
          <h5>Order Total: $ {this.state.activeOrder.total_cost}</h5>
        <Button color="primary">Check Out</Button>
      </div>
    )
  }

  // <div className="products-container">
  //     {this.state.products.map(product => 
  //         <ProductCard 
  //             key={product.id}
  //             product={product}
  //             {...this.props}
  //         />    
  //     )}
  // </div>
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