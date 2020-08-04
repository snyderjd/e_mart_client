const apiUrl = "http://localhost:3000/api";

export default {
    getAllCategories() {
        return fetch(`${apiUrl}/categories`)
            .then(response => response.json());
    }
}
