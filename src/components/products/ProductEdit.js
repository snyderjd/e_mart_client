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

    render() {
        console.log("ProductEdit props", this.props);
        console.log("ProductEdit state", this.state);
        return (
            <div className="ProductEdit--container">
                <h1 className="ProductEdit--heading">Edit Product</h1>
                
            </div>
        )
    }

    //     return (
    //         <div className="ProductForm--container">
    //             <h1 className="ProductForm--heading">Add a New Product</h1>
    //             <div className="ProductForm__form--container">
    //                 <form className="ProductForm__form">
    //                     <div className="ProductForm--inputPair">
    //                         <label htmlFor="name">Name</label>
    //                         <input onChange={this.handleFieldChange}
    //                             type="text"
    //                             id="name"
    //                             value={this.state.name}
    //                             placeholder="Product name"
    //                             required
    //                             autoFocus=""
    //                             className="ProductForm--input"
    //                         />  
    //                     </div>
    //                     <div className="ProductForm--inputPair">
    //                         <label htmlFor="description">Description</label>
    //                         <textarea onChange={this.handleFieldChange} 
    //                             rows={4}
    //                             cols={30}
    //                             id="description"
    //                             value={this.state.description}
    //                             placeholder="Product description"
    //                             required
    //                             className="ProductForm--input">
    //                         </textarea>
    //                     </div>
    //                     <div className="ProductForm--inputPair">
    //                         <label htmlFor="categoryId">Category</label>
    //                         <select
    //                             onChange={this.handleFieldChange}
    //                             id="categoryId"
    //                             value={this.state.categoryId}
    //                             className="ProductForm--input"
    //                         >
    //                             {this.state.categories.map(category => 
    //                                 <option key={category.id} value={category.id}>
    //                                     {category.name}
    //                                 </option>    
    //                             )}
    //                         </select>
    //                     </div>
    //                     <div className="ProductForm--inputPair">
    //                         <label htmlFor="price">Price</label>
    //                         <input onChange={this.handleFieldChange} 
    //                             type="text"
    //                             id="price"
    //                             value={this.state.price}
    //                             placeholder="ex: 19.99"
    //                             required
    //                             className="ProductForm--input"
    //                         />
    //                     </div>
    //                     <div className="ProductForm--inputPair">
    //                         <label htmlFor="quantity">Quantity</label>
    //                         <input onChange={this.handleFieldChange} 
    //                             type="number"
    //                             id="quantity"
    //                             value={this.state.quantity}
    //                             className="ProductForm--input"
    //                         />
    //                     </div>
    //                     <div className="ProductForm--inputPair">
    //                         <label htmlFor="isActive">Status</label>
    //                         <select
    //                             id="isActive"
    //                             value={this.state.isActive}
    //                             onChange={this.handleFieldChange}
    //                         >
    //                             <option value="true">Active</option>
    //                             <option value="false">Inactive</option>
    //                         </select>
    //                     </div>
    //                     <div className="ProductForm__buttons--container">
    //                         <Button onClick={this.handleCancel} color="primary">
    //                             Cancel
    //                         </Button>
    //                         <Button onClick={this.constructNewProduct} color="primary">
    //                             Submit
    //                         </Button>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     )
}

export default ProductEdit;
