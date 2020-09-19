import React, { Component } from 'react';
import ProductDataManager from '../../modules/ProductDataManager';
import ProductCard from './ProductCard';
import './Products.css'
import Cookies from 'universal-cookie';
import UserDataManager from '../../modules/UserDataManager';
import { Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
            sortInput: "",
            page: 1
        };

        this.executeProductSearch = this.executeProductSearch.bind(this);
        this.executeProductFilter = this.executeProductFilter.bind(this);
        this.executeProductSort = this.executeProductSort.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
    }

    componentDidMount() {
        // Get all products and put in state
        ProductDataManager.getAllProducts(this.state.page).then(products => {
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

    async executeProductSearch(searchInput) {
        await this.setState({ searchInput });

        ProductDataManager.getProducts(
            this.state.searchInput, 
            this.state.filterInput, 
            this.state.sortInput,
            this.state.page)
            .then(products => {
                this.setState({ products });
            });
    }

    async executeProductFilter(categoryId) {
        await this.setState({ filterInput: categoryId });

        ProductDataManager.getProducts(
            this.state.searchInput, 
            this.state.filterInput, 
            this.state.sortInput,
            this.state.page)
            .then(products => {
                this.setState({ products });
            });
    }

    async executeProductSort(sortInput) {
        await this.setState({ sortInput: sortInput });

        ProductDataManager.getProducts(
            this.state.searchInput, 
            this.state.filterInput, 
            this.state.sortInput,
            this.state.page
        )
        .then(products => {
            this.setState({ products });
        });
    }

    async handleNextPage(event) {
        event.preventDefault();

        // Increment page value and then get products with the new page value
        await this.setState(prevState => {
            return { page: prevState.page + 1 };
        });

        ProductDataManager.getProducts(
            this.state.searchInput,
            this.state.filterInput,
            this.state.sortInput,
            this.state.page
        )
        .then(products => {
            this.setState({ products });
        });
    }

    async handlePreviousPage(event) {
        event.preventDefault();

        // Decrement page value and then get products with the new page value
        await this.setState(prevState => {
            return { page: prevState.page - 1 };
        });

        ProductDataManager.getProducts(
            this.state.searchInput,
            this.state.filterInput,
            this.state.sortInput,
            this.state.page
        )
        .then(products => {
            this.setState({ products });
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
        return (
            <React.Fragment>
                <div className="ProductList-container">
                    <h1>Products</h1>
                    {this.renderAddProductButton()}
                    <ProductSearch 
                        executeProductSearch={this.executeProductSearch}
                    />
                    <div className="ProductList__sort-filter-container">
                        <ProductFilter 
                            executeProductFilter={this.executeProductFilter}
                        />
                        <ProductSort 
                            executeProductSort={this.executeProductSort}
                        />
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
                    
                    <Pagination className="ProductList__pagination--container ">
                        {/* <PaginationItem>
                            <PaginationLink first />
                        </PaginationItem> */}
                        <PaginationItem>
                            <PaginationLink previous onClick={this.handlePreviousPage} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next onClick={this.handleNextPage} />
                        </PaginationItem>
                        {/* <PaginationItem>
                            <PaginationLink last />
                        </PaginationItem> */}
                    </Pagination>
                    
                </div>
            </React.Fragment>
        )
    }

}

export default ProductList;