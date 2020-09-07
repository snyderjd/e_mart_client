import Cookies from 'universal-cookie';

const apiUrl = "http://localhost:3000/api";

export default {
    getAllProducts() {
        return fetch(`${apiUrl}/products`)
            .then(response => response.json());
    },

    getSingleProduct(id) {
        return fetch(`${apiUrl}/products/${id}`)
            .then(response => response.json());
    },

    postProduct(productForm) {
        const cookies = new Cookies();
        const token = cookies.get('token');

        const config = {
            method: "POST",
            headers: {
                "Authorization": token,
                "Accept": "application/json"
            },
            body: productForm
        }

        return fetch(`${apiUrl}/products`, config)
            .then(response => response.json());
    },

    updateProduct(productForm, productId) {
        const cookies = new Cookies();
        const token = cookies.get('token');

        const config = {
            method: "PUT",
            headers: {
                "Authorization": token,
                "Accept": "application/json"
            },
            body: productForm
        }

        return fetch(`${apiUrl}/products/${productId}`, config)
            .then(response => response.json());
    }

}