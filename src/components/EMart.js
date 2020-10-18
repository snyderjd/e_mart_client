import React, { Component } from 'react';
import NavBar from './nav/NavBar.js';
import ApplicationViews from './ApplicationViews';
import UserDataManager from '../modules/UserDataManager';
import OrderDataManager from '../modules/OrderDataManager';
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
            UserDataManager.getCurrentUser(token).then(user => {
                this.setState({ token: token, currentUser: user })
            });
        }
    }

    logout = () => {
        // Removes the cookie and resets state to clear out token and user info
        const cookies = new Cookies();
        this.setState({ token: "", currentUser: {} });
        cookies.remove('token', { path: "/"});
        cookies.remove('activeOrder', { path: "/"});
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

                    // Create a new order or get user's active order and store in cookies
                    OrderDataManager.createOrder().then(order => {
                        cookies.set('activeOrder', order);
                    });

                } else {
                    // Figure out how to handle unsuccessful response from the API
                }
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="EMart--container">
                    <NavBar {...this.props} logout={this.logout} />
                    <ApplicationViews
                        login={this.login} 
                        currentUser={this.state.currentUser}
                        token={this.state.token} />
                </div>
            </React.Fragment>
        )
    }

}

export default EMart;