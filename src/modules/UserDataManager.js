

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

    // getCurrentUser(token) {
    //     return fetch(`${apiUrl}/users/current`, {
    //         method: "GET",
    //         headers: {
    //             "Authorization": token
    //         }
    //     }).then(response => response.json());
    // }
    
}

// const remoteURL = "http://localhost:5002";

// export default {
//     getAllUsers() {
//         return fetch(`${remoteURL}/users`)
//             .then(response => response.json());
//     },

//     postUser(userObject) {
//         return fetch(`${remoteURL}/users`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(userObject)
//         }).then(response => response.json());
//     },

//     getUser(id) {
//         return fetch(`${remoteURL}/users/${id}`)
//             .then(response => response.json());
//     },

//     checkUsers(email, password) {
//         return fetch(`${remoteURL}/users?email=${email}&&password=${password}`)
//             .then(response => response.json());
//     },

//     editUser(userObject) {
//         return fetch(`${remoteURL}/users/${userObject.id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(userObject)
//         }).then(response => response.json());
//     }

// }