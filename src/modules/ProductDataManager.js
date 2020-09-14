import Cookies from 'universal-cookie';

const apiUrl = "http://localhost:3000/api";

export default {
    getAllProducts() {
        return fetch(`${apiUrl}/products`)
            .then(response => response.json());
    },

    getProducts(searchInput, filterInput, sortInput) {
        const requestUrl = this.buildRequestUrl(searchInput, filterInput, sortInput);

        return fetch(requestUrl).then(response => response.json());
    },

    getSingleProduct(id) {
        return fetch(`${apiUrl}/products/${id}`)
            .then(response => response.json());
    },

    searchProducts(searchInput) {
        return fetch(`${apiUrl}/products?q=${searchInput}`)
            .then(response => response.json());
    },

    getFilteredProducts(categoryId) {
        return fetch(`${apiUrl}/products?category_id=${categoryId}`)
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
    },

    deleteProductImage(productId) {
        const cookies = new Cookies();
        const token = cookies.get('token');

        return fetch(`${apiUrl}/products/${productId}/image`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }
        }).then(response => {
            
            if (response.ok) {
                window.alert("Product image deleted!")
                return response.json();
            } else {
                window.alert("Error: something went wrong.")
            }
        });
    },

    // Takes in search, filter, and sort values and builds request url to get products
    buildRequestUrl(search, filter, sort) {
        let requestUrl;

        if (search === "" && filter === "" && sort === "") {
            // no searchInput, no filterInput, no sortInput
            requestUrl = `${apiUrl}/products`

        } else if (search !== "" && filter !== "" && sort !== "") {
            // searchInput, filterInput, sortInput - all
            requestUrl = `${apiUrl}/products?q=${search}&category_id=${filter}&sort=${sort}`;

        } else if (search !== "" && filter === "" && sort === "") {
            // searchInput only
            requestUrl = `${apiUrl}/products?q=${search}`;

        } else if (search === "" && filter !== "" && sort === "") {
            // filterInput only
            requestUrl = `${apiUrl}/products?category_id=${filter}`;

        } else if (search === "" && filter === "" && sort !== "") {
            // sortInput only
            requestUrl = `${apiUrl}/products?sort=${sort}`;

        } else if (search !== "" && filter !== "" && sort === "") {
            // searchInput and filterInput
            requestUrl = `${apiUrl}/products?q=${search}&category_id=${filter}`;

        } else if (search !== "" && filter === "" && sort !== "") {
            // searchInput and sortInput
            requestUrl = `${apiUrl}/products?q=${search}&sort=${sort}`;

        } else if (search === "" && filter !== "" && sort !== "") {
            // filterInput and sortInput
            requestUrl = `${apiUrl}/products?category_id=${filter}&sort=${sort}`;

        }
        
        console.log("requestUrl", requestUrl);
        return requestUrl;
    }

}