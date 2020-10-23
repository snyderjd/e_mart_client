import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './NavBar.css';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
    }

    renderLoginOrLogout = () => {
        const cookies = new Cookies();
        const token = cookies.get('token');

        if (token) {
            return (
                <li className="nav-item">
                    <Link onClick={this.handleLogout} to="/" className="nav-link">Logout</Link>
                </li>
            )
        } else {
            return (
                <li className="nav-item">
                    <Link to="/auth" className="nav-link">Login/Register</Link>
                </li>
            )
        }
    }

    renderCartLink = () => {
        const cookies = new Cookies();
        const token = cookies.get('token');

        if (token) {
            return (
                <li className="nav-item">
                    <Link to="/cart" className="nav-link">Cart</Link>
                </li>
            )
        }
    }

    renderOrdersLink = () => {
        const cookies = new Cookies();
        const token = cookies.get('token')

        if (token) {
            return (
                <li className="nav-item">
                    <Link to="/orders" className="nav-link">Orders</Link>
                </li>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar fixed-top navbar-expand d-flex justify-content-between">
                    <ul className="navbar-nav d-flex justify-content-end">
                        <li className="nav-item">
                            <Link to="/products" className="nav-link">Products</Link>
                        </li>
                        {this.renderLoginOrLogout()}
                        {this.renderCartLink()}
                        {this.renderOrdersLink()}
                    </ul>
                </nav>
            </React.Fragment>
        )
    }

}

export default NavBar;

