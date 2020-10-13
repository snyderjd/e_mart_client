import Cookies from 'universal-cookie';

const apiUrl = "http://localhost:3000/api";
const cookies = new Cookies();
const token = cookies.get('token');

export default {
  createOrder() {
    return fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then(response => response.json());
  },

  getOrders() {
    return fetch(`${apiUrl}/orders`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).then(response => response.json());
  },

  getOrder(id) {
    return fetch(`${apiUrl}/orders/${id}`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).then(response => response.json());
  },

  addProductToOrder(orderId, productId) {
    return fetch(`${apiUrl}/orders/${orderId}/${productId}`, {
      method: "POST",
      headers: {
        "Authorization": token
      }
    }).then(response => {
      if (response.ok) {
        window.alert("Product successfully added to cart.");
        return response.json();
      } else {
        window.alert("Error: Product not added to cart.");
      }
    });
  },

  deleteProductFromOrder(orderId, productId) {
    return fetch(`${apiUrl}/orders/${orderId}/${productId}`, {
      method: "DELETE",
      headers: {
        "Authorization": token
      }
    }).then(response => response.json());
  },

  updateOrder(orderId, order) {
    return fetch(`${apiUrl}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(order)
    }).then(response => {
      if (response.ok) {
        window.alert("Your order was completed successfully!");
        return response.json();
      } else {
        window.alert("Error: your order was not completed.");
        return response.json();
      }
    });
  }

}





