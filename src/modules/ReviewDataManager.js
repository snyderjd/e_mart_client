import Cookies from "universal-cookie";

const apiUrl = "http://localhost:3000/api";

export default {

  getProductReviews(productId) {
    return fetch(`${apiUrl}/products/${productId}/reviews`)
      .then(response => response.json());
  },

  getReview(reviewId) {
    return fetch(`${apiUrl}/reviews/${reviewId}`)
      .then(response => response.json());
  },

  createReview(review, productId) {
    const cookies = new Cookies();
    const token = cookies.get('token');
    console.log("review object:", JSON.stringify(review));

    const config = {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    }

    return fetch(`${apiUrl}/products/${productId}/reviews`, config)
      .then(response => response.json());
  }

}
