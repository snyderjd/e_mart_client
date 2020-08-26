import React, { Component } from 'react';
import OrderDataManager from '../../modules/OrderDataManager';
import Cookies from 'universal-cookie';
import './Orders.css';

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
        console.log("orders", orders);
        const completedOrders = orders.filter(order => order.is_complete === true)
        console.log("completedOrders", completedOrders);
        this.setState({ completedOrders })
      });
  }

  render() {
    console.log("OrderList state:", this.state);
    return (
      <div className="OrderList__container">
        <h1>Order History</h1>
      </div>
    )
  }

}

export default OrderList;