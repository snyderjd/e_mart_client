import React, { Component } from 'react';
import { Button } from 'reactstrap';
import ProductDataManager from '../../modules/ProductDataManager';
import CategoryDataManager from '../../modules/CategoryDataManager';
import './Products.css';

class ProductEdit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            description: "",
            categoryId: 1,
            price: "",
            quantity: 0,
            isActive: "true",
            category: "",
            categories: []
        }
    }

    componentDidMount() {

        // Get the product with its id and store its properties in state
        ProductDataManager.getSingleProduct(this.props.productId)
            .then(product => {
                this.setState({
                    name: product.name,
                    description: product.description,
                    categoryId: product.category_id,
                    price: product.price,
                    quantity: product.quantity,
                    isActive: product.is_active,
                    category: product.category.name
                });
            });

        // Get the categories and store in state
        CategoryDataManager.getAllCategories().then(categories => {
            this.setState({ categories: categories });
        });

    }

    // Update state when input fields change
    handleFieldChange = (event) => {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    }

    // Take user back to the product detail
    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push(`/products/${this.props.productId}`);
    }

    // Takes user's inputs, builds a product object, then calls the function that saves the product to the DB
    constructUpdatedProduct = (event) => {
        
        if (this.state.name === "" ||
            this.state.description === "" ||
            this.state.price === "" ||
            this.state.quantity <= 0) {
                alert("Please fill out all fields")
            } else {
                const updatedProduct = {
                    product: {
                        id: this.props.productId,
                        name: this.state.name,
                        description: this.state.description,
                        category_id: this.state.categoryId,
                        price: this.state.price,
                        quantity: this.state.quantity,
                        is_active: this.state.isActive
                    }
                }

                ProductDataManager.updateProduct(updatedProduct).then(() => {
                    this.props.history.push(`/products/${this.props.productId}`);
                });
            }
    }

    // Takes user's inputs, builds a product object, then calls the function that saves the product to the DB
    // constructNewProduct = (event) => {

    //     if (this.state.name === "" || 
    //         this.state.description === "" || 
    //         this.state.price === "" ||
    //         this.state.quantity <= 0) {
    //             alert("Please fill out all fields")
    //         } else {
    //             const newProduct = {
    //                 product: {
    //                     name: this.state.name,
    //                     description: this.state.description,
    //                     category_id: this.state.categoryId,
    //                     price: this.state.price,
    //                     quantity: this.state.quantity,
    //                     is_active: this.state.isActive
    //                 }
    //             }

    //             ProductDataManager.postProduct(newProduct).then(() => {
    //                 this.props.history.push("/products");
    //             });
    //         }
    // }

    render() {
        console.log("ProductEdit props", this.props);
        console.log("ProductEdit state", this.state);
        return (
            <div className="ProductEdit--container">
                <h1 className="ProductEdit--heading">Edit Product</h1>
                <div className="ProductEdit__form--container">
                    <form className="ProductEdit__form">
                        <div className="ProductEdit--inputPair">
                            <label htmlFor="name">Name</label>
                            <input onChange={this.handleFieldChange} 
                                type="text"
                                id="name"
                                value={this.state.name}
                                placeholder="Product name"
                                required
                                autoFocus=""
                                className="ProductEdit--input"
                            />
                        </div>
                        <div className="ProductEdit--inputPair">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={this.handleFieldChange}
                                rows={4}
                                cols={30}
                                id="description"
                                value={this.state.description}
                                placeholder="Product description"
                                required
                                className="ProductEdit--input">
                            </textarea>
                        </div>
                        <div className="ProductEdit--inputPair">
                            <label htmlFor="categoryId">Category</label>
                            <select
                                onChange={this.handleFieldChange}
                                id="categoryId"
                                value={this.state.categoryId}
                                className="ProductEdit--input"
                            >
                                {this.state.categories.map(category => 
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>    
                                )}
                            </select>
                        </div>
                        <div className="ProductEdit--inputPair">
                            <label htmlFor="price">Price</label>
                            <input onChange={this.handleFieldChange} 
                                type="text"
                                id="price"
                                value={this.state.price}
                                placeholder="ex: 19.99"
                                required
                                className="ProductEdit--input"
                            />
                        </div>
                        <div className="ProductEdit--inputPair">
                            <label htmlFor="isActive">Status</label>
                            <select
                                id="isActive"
                                value={this.state.isActive}
                                onChange={this.handleFieldChange}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                        <div className="ProductEdit__buttons--container">
                            <Button onClick={this.handleCancel} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.constructUpdatedProduct} color="primary">
                                Submit
                            </Button>             
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProductEdit;
    