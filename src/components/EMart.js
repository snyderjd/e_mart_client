import React, { Component } from 'react';
import NavBar from './nav/NavBar.js';
import ApplicationViews from './ApplicationViews';
import UserDataManager from './auth/UserDataManager';
import Cookies from 'universal-cookie';
import './EMart.css';

class EMart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: "",
            currentUser: {}
        }
    }

    componentDidMount() {
        // If there is already a token in cookies, use it to get the current user and store in state (keeps session alive by re-fetching the user if there's still a token in the cookies)
        const cookies = new Cookies();
        const token = cookies.get('token');

        if (token) {
            console.log("already have a token");
            UserDataManager.getCurrentUser(token).then(user => {
                this.setState({ token: token, currentUser: user })
            });
        }
    }

    logout = () => {
        // Removes the cookie and resets state to clear out token and user info
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        this.setState({ token: "", currentUser: {} })
    }

    login = (authObject) => {
        UserDataManager.postUserToken(authObject)
            .then(response => {
                if (response.jwt) {
                    // Add jwt to cookies, get the current User and store in state
                    const cookies = new Cookies();
                    cookies.set('token', `Bearer ${response.jwt}`);

                    this.setState({ token: `Bearer ${response.jwt}`});

                    UserDataManager.getCurrentUser(this.state.token).then(user => {
                        this.setState({ currentUser: user });
                    });

                } else {
                    // Figure out how to handle unsuccessful response from the API
                }
            });
    }

//     logout = () => {
//         sessionStorage.clear();
//         this.setState({ username: "" })
//     }

//     login = () => {
//         this.setState({ activeUserId: sessionStorage.getItem("activeUserId")})
//         UserDataManager.getUser(this.state.activeUserId).then(user => {
//             this.setState({
//                 username: user.username,
//                 activeUserId: sessionStorage.getItem("activeUserId")
//             })
//         })
//     }    

    render() {
        console.log("EMart state", this.state);
        return (
            <React.Fragment>
                <NavBar {...this.props} logout={this.logout} />
                <ApplicationViews login={this.login} currentUser={this.state.currentUser} />
            </React.Fragment>
        )
    }

}

export default EMart;

// import React, { Component } from 'react';
// import NavBar from './nav/NavBar';
// import ApplicationViews from './ApplicationViews';
// import UserDataManager from './auth/UserDataManager';
// import './SkillSource.css';

// class SkillSource extends Component {
//     state = {
//         activeUserId: parseInt(sessionStorage.getItem("activeUserId")),
//         username: ""
//     }
    
//     // componentDidMount() {
//     //     UserDataManager.getUser(this.state.activeUserId).then(user => {
//     //         this.setState({ username: user.username })
//     //     })
//     // }

//     logout = () => {
//         sessionStorage.clear();
//         this.setState({ username: "" })
//     }

//     login = () => {
//         this.setState({ activeUserId: sessionStorage.getItem("activeUserId")})
//         UserDataManager.getUser(this.state.activeUserId).then(user => {
//             this.setState({
//                 username: user.username,
//                 activeUserId: sessionStorage.getItem("activeUserId")
//             })
//         })
//     }
    
//     render() {
//         return (
//             <React.Fragment>
//                 <NavBar {...this.props} logout={this.logout} username={this.state.username} />
//                 <ApplicationViews login={this.login}/>
//             </React.Fragment>
//         )
//     }
// }

// export default SkillSource;