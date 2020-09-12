import React, { Component } from 'react';
import ProductDataManager from '../../modules/ProductDataManager';
import ProductCard from './ProductCard';
import './Products.css'
import Cookies from 'universal-cookie';
import UserDataManager from '../../modules/UserDataManager';
import { Button } from 'reactstrap';
import ProductSearch from './ProductSearch';
import ProductFilter from './ProductFilter';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currentUser: {}
        };
    }

    componentDidMount() {
        // Get all products and put in state
        ProductDataManager.getAllProducts().then(products => {
            this.setState({ products: products })
        });

        // If there is already a token in cookies, use it to get the current user and store in state
        const cookies = new Cookies();
        const token = cookies.get('token');

        if (token) {
            UserDataManager.getCurrentUser(token).then(user => {
                this.setState({ currentUser: user })
            });
        }

    }

    executeProductSearch = (searchInput) => {
        ProductDataManager.searchProducts(searchInput).then(products => {
            this.setState({ products: products });
        });
    }

    renderAddProductButton() {
        if (this.state.currentUser.role === "admin") {
            return <Button
                        className="AddProduct__button" 
                        onClick={() => this.props.history.push("/products/create")} 
                        color="primary">
                        Add Product
                    </Button>
        }
    }

    render() {
        console.log("ProductList state", this.state);
        return (
            <React.Fragment>
                <div className="ProductList-container">
                    <h1>Products</h1>
                    {this.renderAddProductButton()}
                    <ProductSearch 
                        executeProductSearch={this.executeProductSearch}
                    />
                    <ProductFilter />
                    <div className="products-container">
                        {this.state.products.map(product => 
                            <ProductCard 
                                key={product.id}
                                product={product}
                                currentUser={this.state.currentUser}
                                {...this.props}
                            />    
                        )}
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }

}

export default ProductList;