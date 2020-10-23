import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Auth from './auth/Auth';
import ProductList from './products/ProductList';
import ProductForm from './products/ProductForm';
import ProductDetail from './products/ProductDetail';
import ProductEdit from './products/ProductEdit';
import OrderList from './orders/OrderList';
import Cart from './orders/Cart';

class ApplicationViews extends Component {
    state = {}

    isAdmin = () => (this.props.currentUser.role === "admin" ? true : false )

    isAuthorized = () => (this.props.currentUser ? true : false )

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    return <ProductList {...props} />
                }} />

                <Route exact path="/auth" render={props => {
                    return <Auth {...props} login={this.props.login} />
                }} />

                <Route exact path="/products" render={props => {
                    return <ProductList {...props} />
                }} />

                <Route exact path="/products/create" render={props => {
                    // Renders form for admins to add new products
                    if (this.isAdmin()) {
                        return <ProductForm {...props} />
                    }
                }} />

                <Route exact path="/products/:productId(\d+)" render={props => {
                    // pass the productId to the ProductDetail component
                    return <ProductDetail productId={parseInt(props.match.params.productId)} {...props} />
                }} />

                <Route exact path="/products/:productId(\d+)/edit" render={props => {
                    // Renders form for admins to edit products
                    if (this.isAdmin()) {
                        return <ProductEdit productId={parseInt(props.match.params.productId)} {...props} />
                    }
                }} />

                <Route exact path="/cart" render={props => {
                    // Renders Cart component if user is authorized
                    if (this.isAuthorized()) {
                        return <Cart {...props} />
                    }
                }} />

                <Route exact path="/orders" render={props => {
                    // Renders OrderList component if user is authorized
                    if (this.isAuthorized()) {
                        return <OrderList {...props} />
                    }
                }} />

            </React.Fragment>
        )
    }

}

export default ApplicationViews;
