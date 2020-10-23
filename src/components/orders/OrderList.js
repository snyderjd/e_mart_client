import React, { Component } from 'react';
import OrderDataManager from '../../modules/OrderDataManager';
import Cookies from 'universal-cookie';
import './Orders.css';
import { Button } from 'reactstrap';

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completedOrders: [],
    }
  }

  componentDidMount() {
    // Get user's orders and put in state (should only be completed orders)
    OrderDataManager.getOrders()
      .then(orders => {
        const completedOrders = orders.filter(order => order.is_complete === true)
        this.setState({ completedOrders })
      });
  }

  formatDate = (orderDate) => {
    return new Date(orderDate).toLocaleDateString();
  }

  formatCost = (orderCost) => {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return formatter.format(orderCost);
  }

  render() {
    return (
      <div className="OrderList__container">
        <h1>Order History</h1>
        <div className="OrderCard__container">
          {this.state.completedOrders && this.state.completedOrders.map(order => 
            // Render OrderCards for each order
            <div className="completedOrder__container">
              <div className="completedOrder__banner">
                <h5>Order Completed: {this.formatDate(order.updated_at)}</h5>
                <h5>Total Cost: {this.formatCost(order.total_cost)}</h5>
              </div>
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
                  {order.products.map(product =>
                    <tr>
                      <td>
                        {product.image_url !== "No image" &&
                          <img alt="Product image" src={product.image_url}
                              height="80"
                              width="80"
                          >
                          </img>
                        }
                      </td>
                      <td>{product.name}</td>
                      <td>{product.description.slice(0, 50)}...</td>
                      <td>$ {product.price}</td>
                    </tr> 
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )
  }

}

export default OrderList;