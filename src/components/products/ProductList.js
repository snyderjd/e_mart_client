import React, { Component } from 'react';
import ProductDataManager from './ProductDataManager';
import ProductCard from './ProductCard';
import './Products.css'

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        // Get all products and put in state
        ProductDataManager.getAllProducts().then(products => {
            this.setState({ products: products })
        });
    }

    render() {
        console.log("ProductList state", this.state);
        return (
            <React.Fragment>
                <div className="ProductList-container">
                    <h1>All Products</h1>
                    <div className="products-container">
                        {this.state.products.map(product => 
                            <ProductCard 
                                key={product.id}
                                product={product}
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