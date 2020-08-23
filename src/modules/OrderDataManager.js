import Cookies from 'universal-cookie';

const apiUrl = "http://localhost:3000/api";

export default {
  createOrder() {
    const cookies = new Cookies();
    const token = cookies.get('token');

    return fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then(response => response.json());
  },

  getOrder(id) {
    const cookies = new Cookies();
    const token = cookies.get('token');

    return fetch(`${apiUrl}/orders/${id}`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).then(response => response.json());
  },

  deleteProductFromOrder(orderId, productId) {
    const cookies = new Cookies();
    const token = cookies.get('token');

    return fetch(`${apiUrl}/orders/${orderId}/${productId}`, {
      method: "DELETE",
      headers: {
        "Authorization": token
      }
    }).then(response => response.json());
  }

}








