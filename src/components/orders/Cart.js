import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import OrderDataManager from '../../modules/OrderDataManager';
import './Orders.css';

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

  handleRemoveProduct = (event) => {
    event.preventDefault();

    OrderDataManager.deleteProductFromOrder(this.state.activeOrderId, event.target.id)
      .then(response => {
        console.log("response", response);
        OrderDataManager.getOrder(this.state.activeOrderId)
          .then(activeOrder => {
            this.setState({ activeOrder })
          });
      });
      
  }

  render() {
    console.log("Cart state", this.state);
    return (
      <div className="Cart__container">
        <h1>Cart</h1>
        <table className="Cart__products--table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Cost</th>
            </tr> 
          </thead>
          <tbody>
            {this.state.activeOrder.products && this.state.activeOrder.products.map(product =>
              <tr>
                <td>{product.name}</td>
                <td>{product.description.slice(0, 40)}...</td>
                <td>$ {product.price}</td>
                <td>
                  <Button onClick={this.handleRemoveProduct} id={product.id} color="danger">Remove</Button>
                </td>
              </tr> 
            )}
          </tbody>
        </table>
          <h5>Order Total: $ {this.state.activeOrder.total_cost}</h5>
        <Button color="primary">Check Out</Button>
      </div>
    )
  }

}

export default Cart;