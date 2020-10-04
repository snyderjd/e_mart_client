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
            sortInput: "a_to_z",
            page: 1,
            resultsPerPage: 5,
            totalResults: 0
        };

        this.executeProductSearch = this.executeProductSearch.bind(this);
        this.executeProductFilter = this.executeProductFilter.bind(this);
        this.executeProductSort = this.executeProductSort.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleFirstPage = this.handleFirstPage.bind(this);
        this.handleLastPage = this.handleLastPage.bind(this);
    }

    getProducts = (searchInput, filterInput, sortInput, page) => {
        ProductDataManager.getProducts(searchInput, filterInput, sortInput, page)
            .then(response => {
                this.setState({
                    products: response.products,
                    totalResults: response.meta.total_entries
                });
            });
    }

    componentDidMount() {

        this.getProducts(
            this.state.searchInput,
            this.state.filterInput,
            this.state.sortInput,
            this.state.page
        );

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
        await this.setState({ searchInput: searchInput, page: 1 });

        this.getProducts(
            this.state.searchInput, 
            this.state.filterInput, 
            this.state.sortInput, 
            this.state.page
        );
    }

    async executeProductFilter(categoryId) {
        await this.setState({ filterInput: categoryId, page: 1 });

        this.getProducts(
            this.state.searchInput,
            this.state.filterInput,
            this.state.sortInput,
            this.state.page
        );
    }

    async executeProductSort(sortInput) {
        await this.setState({ sortInput: sortInput, page: 1 });

        this.getProducts(
            this.state.searchInput,
            this.state.filterInput,
            this.state.sortInput,
            this.state.page
        );
    }

    async handleNextPage(event) {
        event.preventDefault();

        const totalPages = Math.ceil(this.state.totalResults / this.state.resultsPerPage);

        // If not already on the last page, increment page value and get products with the new page value
        if (this.state.page < totalPages) {
            await this.setState(prevState => {
                return { page: prevState.page + 1 }
            });

            this.getProducts(
                this.state.searchInput,
                this.state.filterInput,
                this.state.sortInput,
                this.state.page
            );
        }

    }

    async handlePreviousPage(event) {
        event.preventDefault();

        // If current page !== 1, decrement page value and then get products with the new page value
        if (this.state.page !== 1) {
            await this.setState(prevState => {
                return { page: prevState.page - 1 };
            });

            this.getProducts(
                this.state.searchInput,
                this.state.filterInput,
                this.state.sortInput,
                this.state.page
            );
        }
    }

    async handleFirstPage(event) {
        event.preventDefault();

        // Get the first page of results
        await this.setState({ page: 1 });

        this.getProducts(
            this.state.searchInput,
            this.state.filterInput,
            this.state.sortInput,
            this.state.page
        );
    }

    async handleLastPage(event) {
        event.preventDefault();

        // Get the last page of results
        const totalPages = Math.ceil(this.state.totalResults / this.state.resultsPerPage);

        await this.setState({ page: totalPages });

        this.getProducts(
            this.state.searchInput,
            this.state.filterInput,
            this.state.sortInput,
            this.state.page
        );
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
        console.log("ProductList state:", this.state);
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
                    <h5>{this.state.totalResults} Results</h5>
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
                        <PaginationItem>
                            <PaginationLink first onClick={this.handleFirstPage} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink previous onClick={this.handlePreviousPage} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next onClick={this.handleNextPage} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink last onClick={this.handleLastPage} />
                        </PaginationItem>
                    </Pagination>
                    
                </div>
            </React.Fragment>
        )
    }

}

export default ProductList;