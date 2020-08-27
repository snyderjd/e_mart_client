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

    // this.toggle = this.toggle.bind(this);
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

  formatDate = (orderDate) => {
    return new Date(orderDate).toLocaleDateString();
  }

  formatCost = (orderCost) => {
    // return parseInt(orderCost).toFixed(2);
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return formatter.format(orderCost);
  }

  render() {
    console.log("OrderList state:", this.state);
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
                    <th>Product</th>
                    <th>Description</th>
                    <th>Cost</th>
                  </tr> 
                </thead>
                <tbody>
                  {order.products.map(product =>
                    <tr>
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

//   render() {
//     console.log("ProductList state", this.state);
//     return (
//         <React.Fragment>
//             <div className="ProductList-container">
//                 <h1>All Products</h1>
//                 {this.renderAddProductButton()}
//                 <div className="products-container">
//                     {this.state.products.map(product => 
//                         <ProductCard 
//                             key={product.id}
//                             product={product}
//                             currentUser={this.state.currentUser}
//                             {...this.props}
//                         />    
//                     )}
//                 </div>
                
//             </div>
//         </React.Fragment>
//     )
// }

}

export default OrderList;