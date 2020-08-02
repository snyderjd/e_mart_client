import React, { Component } from 'react';
import { Button } from 'reactstrap';
import ProductDataManager from './ProductDataManager';

class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        console.log("ProductForm state", this.state);
        console.log("ProductForm props", this.props);
        return (
            <React.Fragment>
                <h1>Add a New Product</h1>
            </React.Fragment>
        )
    }

}

export default ProductForm;