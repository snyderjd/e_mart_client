const apiUrl = "http://localhost:3000/api";

export default {

  getProductReviews(productId) {
    return fetch(`${apiUrl}/products/${productId}/reviews`)
      .then(response => response.json());
  }

}
