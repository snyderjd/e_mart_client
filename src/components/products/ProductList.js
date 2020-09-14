import React, { Component } from 'react';
import ProductDataManager from '../../modules/ProductDataManager';
import ProductCard from './ProductCard';
import './Products.css'
import Cookies from 'universal-cookie';
import UserDataManager from '../../modules/UserDataManager';
import { Button } from 'reactstrap';
import ProductSearch from './ProductSearch';
import ProductFilter from './ProductFilter';
import ProductSort from './ProductSort';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            currentUser: {},
            searchInput: "",
            filterInput: "",
            sortInput: ""
        };

        // this.toggle = this.toggle.bind(this);
        // this.executeProductSearch = this.executeProductSearch.bind(this);
        this.setState = this.setState.bind(this);
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

    // handleFieldChange = (event) => {
    //     const newState = {};
    //     newState[event.target.id] = event.target.value;
    //     this.setState(newState);
    // }

    executeProductSearch = (searchInput) => {
        this.setState({ searchInput: searchInput });

        console.log("executeProductSearch:", this.state);

        ProductDataManager.getProducts(this.state.searchInput, this.state.filterInput, this.state.sortInput)
            .then(products => {
                this.setState({ products: products });
            });

        // ProductDataManager.searchProducts(searchInput).then(products => {
        //     this.setState({ products: products });
        // });

        // Reset searchInput value
        this.setState({ searchInput: "" });
    }

    executeProductFilter = (categoryId) => {
        this.setState({ filterInput: categoryId });

        ProductDataManager.getProducts(this.state.searchInput, this.state.filterInput, this.state.sortInput)
            .then(products => {
                this.setState({ products: products });
            });

        // Reset filterInput value
        this.setState({ filterInput: "" });

        // If categoryId passed in is an id, invoke API call to get products by categoryId, otherwise invoke API call to get all products
        // if (categoryId === "all_categories") {
        //     ProductDataManager.getAllProducts()
        //         .then(products => {
        //             this.setState({ products: products });
        //         });
        // } else {
        //     ProductDataManager.getFilteredProducts(categoryId)
        //         .then(products => {
        //             this.setState({ products: products })
        //         })
        // }

    }

    executeProductSort = (sortInput) => {
        this.setState({ sortInput: sortInput });

        
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
                        filterInput={this.state.filterInput}
                    />
                    <div className="ProductList__sort-filter-container">
                        <ProductFilter 
                            executeProductFilter={this.executeProductFilter}
                            searchInput={this.state.searchInput}
                        />
                        <ProductSort />
                    </div>
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