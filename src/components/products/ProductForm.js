import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ProductDataManager from '../../modules/ProductDataManager';
import CategoryDataManager from '../../modules/CategoryDataManager';

class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            categoryId: 1,
            price: "",
            quantity: 0,
            isActive: "true",
            categories: []
        };
    }

    componentDidMount() {
        // Get product categories and store in state
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

    // Send user back to products page when they click 'Cancel'
    handleCancel = (event) => {
        this.props.history.push("/products");
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const productForm = new FormData(event.target);
        
        ProductDataManager.postProduct(productForm).then((product) => {
            this.props.history.push(`/products/${product.id}`);
        });
    } 

    render() {
        return (
            <div className="ProductForm--container">
                <h1 className="ProductForm--heading">Add a New Product</h1>
                <div className="ProductForm__form--container">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text"
                                id="name"
                                placeholder="Product name"
                                name="name"    
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
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category_id">Category</Label>
                            <Input type="select" name="category_id" id="category_id">
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
                                placeholder="ex: 19.99"
                                required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input 
                                type="number" 
                                name="quantity" 
                                id="quantity" 
                                required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="is_active">Status</Label>
                            <Input type="select" name="is_active" id="is_active">
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Image</Label>
                            <Input type="file" accept="image/*" name="image" id="image" />
                        </FormGroup>
                        <div className="ProductForm__buttons--container">
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

export default ProductForm;