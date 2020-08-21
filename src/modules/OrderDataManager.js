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
  }

}