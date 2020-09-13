import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import CategoryDataManager from '../../modules/CategoryDataManager';
import './Products.css';

class ProductFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    CategoryDataManager.getAllCategories()
      .then(categories => {
        this.setState({ categories });
      });
  }

  handleFilter = (event) => {
    event.preventDefault();
    const categoryId = event.target.value;
    this.props.executeProductFilter(categoryId);
  }

  render() {
    return (
      <div className="ProductFilter__container">
        <div className="ProductFilter__inputGroup">
          <Label className="ProductFilter__label" htmlFor="category_id">Filter by Category:</Label>
          <Input 
            className="ProductFilter__input" 
            type="select" 
            name="category_id" 
            id="category_id"
            onChange={this.handleFilter}>
            <option value="all_categories">All Categories</option>
            {this.state.categories.map(category => 
              <option key={category.id} value={category.id}>{category.name}</option>  
            )}
          </Input>
        </div>
      </div>
    )
  }  
}

export default ProductFilter;