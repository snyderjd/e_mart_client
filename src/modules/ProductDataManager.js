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

    postProduct(newProduct) {
        const cookies = new Cookies();
        const token = cookies.get('token');

        return fetch(`${apiUrl}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newProduct)
        }).then(response => response.json());
    },

    updateProduct(product) {
        const cookies = new Cookies();
        const token = cookies.get('token');

        return fetch(`${apiUrl}/products/${product.product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(product)           
        }).then(response => response.json());
    }

}