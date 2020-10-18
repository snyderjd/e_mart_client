
const apiUrl = "http://localhost:3000";

export default {
    postUser(userObject) {
        return fetch(`${apiUrl}/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        }).then(response => response.json());
    },

    postUserToken(authObject) {
        return fetch(`${apiUrl}/user_token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authObject)
        }).then(response => response.json());
    },

    getCurrentUser(token) {
        if (document.cookie.includes("token=Bearer")) { 

            return fetch(`${apiUrl}/users/current`, {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).then(response => response.json())
        }
    }
    
}