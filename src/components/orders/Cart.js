import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import CheckoutModal from './CheckoutModal';
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

  updateOrder = (order) => {
    // Calls OrderDataManager.updateOrder(orderId, order), passing in the order object received from the CheckoutModal and using the activeOrderId in state
    console.log("updatedOrder", order);
    OrderDataManager.updateOrder(this.state.activeOrderId, order)
      .then(order => {

        if (order.is_complete === true) {
          // Create a new order for the user
          OrderDataManager.createOrder()
            .then((newActiveOrder) => {
              // Replace cookies with new activeOrder
              const cookies = new Cookies();
              cookies.set('activeOrder', newActiveOrder)
              
            });
          
          this.props.history.push("/products");
        }
        
      });
    
  }

  render() {
    return (
      <div className="Cart__container">
        <h1>Cart</h1>
        <table className="Cart__products--table table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Description</th>
              <th>Cost</th>
            </tr> 
          </thead>
          <tbody>
            {this.state.activeOrder.products && this.state.activeOrder.products.map(product =>
              <tr>
                <td>
                  {product.image_url !== "No image" &&
                    <img alt="Product image" src={product.image_url}
                        height="100"
                        width="100"
                    >
                    </img>
                  }
                </td>
                <td>{product.name}</td>
                <td>{product.description.slice(0, 50)}...</td>
                <td>$ {product.price}</td>
                <td>
                  <Button onClick={this.handleRemoveProduct} id={product.id} color="danger">Remove</Button>
                </td>
              </tr> 
            )}
          </tbody>
        </table>
          <h5>Order Total: $ {this.state.activeOrder.total_cost}</h5>
        <CheckoutModal updateOrder={this.updateOrder} />
      </div>
    )
  }

}

export default Cart;