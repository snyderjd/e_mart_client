import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ProductDataManager from '../../modules/ProductDataManager';
import CategoryDataManager from '../../modules/CategoryDataManager';
import './Products.css';

class ProductEdit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            description: "",
            category_id: 1,
            price: "",
            quantity: 0,
            is_active: "true",
            category: "",
            image_url: "",
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
                    category_id: product.category_id,
                    price: product.price,
                    quantity: product.quantity,
                    is_active: product.is_active,
                    category: product.category.name,
                    image_url: product.image_url
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

    handleSubmit = (event) => {
        event.preventDefault();

        const productForm = new FormData(event.target);

        ProductDataManager.updateProduct(productForm, this.props.productId)
            .then(product => {
                this.props.history.push(`/products/${this.props.productId}`);
            });
    }

    handleDeleteImage = (event) => {
        event.preventDefault();

        // Call API function to remove the product's image, then use the returned product to update state
        ProductDataManager.deleteProductImage(this.props.productId)
            .then(product => {
                this.setState({
                    name: product.name,
                    description: product.description,
                    category_id: product.category_id,
                    price: product.price,
                    quantity: product.quantity,
                    is_active: product.is_active,
                    category: product.category.name,
                    image_url: product.image_url
                });
            });
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

    render() {
        return (
            <div className="ProductEdit--container">
                <h1 className="ProductEdit--heading">Edit Product</h1>
                <div className="ProductEdit__form--container">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text"
                                id="name"
                                placeholder="Product name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleFieldChange}
                                required
                                autoFocus=""
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input 
                                type="textarea"
                                id="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleFieldChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category_id">Category</Label>
                            <Input 
                                type="select"
                                name="category_id"
                                id="category_id"
                                value={this.state.category_id}
                                onChange={this.handleFieldChange}
                            >
                                {this.state.categories.map(category => 
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>    
                                )}    
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input 
                                type="text"
                                name="price"
                                id="price"
                                value={this.state.price}
                                onChange={this.handleFieldChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input 
                                type="number"
                                name="quantity"
                                id="quantity"
                                value={this.state.quantity}
                                onChange={this.handleFieldChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="is_active">Status</Label>
                            <Input 
                                type="select" 
                                name="is_active" 
                                id="is_active"
                                value={this.state.is_active}
                                onChange={this.handleFieldChange}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            {this.state.image_url !== "No image" &&
                                <img alt="Product image" src={this.state.image_url}
                                    height="200"
                                    width="200"
                                >
                                </img>
                            }
                            <Button onClick={this.handleDeleteImage} color="danger">
                                Remove Image
                            </Button>
                            <Label for="image">Upload a new image to replace the above image</Label>
                            <Input type="file" accept="image/*" name="image" id="image" />
                        </FormGroup>
                        <div className="ProductEdit__buttons--container">
                            <Button onClick={this.handleCancel} color="danger">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default ProductEdit;