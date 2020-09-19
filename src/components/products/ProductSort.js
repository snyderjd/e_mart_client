import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import './Products.css';

class ProductSort extends Component {

  handleSort = (event) => {
    event.preventDefault();
    const sortInput = event.target.value;
    this.props.executeProductSort(sortInput);
  }

  render() {
    return (
      <div className="ProductSort__container">
        <div className="ProductSort__inputGroup">
          <Label className="ProductSort__label" htmlFor="product-sort">Sort:</Label>
          <Input
            className="ProductSort__input"
            type="select"
            name="product-sort"
            id="product-sort"
            onChange={this.handleSort}
          >
            <option value="">Default</option>
            <option value="price_ascending">Price: Low to High</option>
            <option value="price_descending">Price: High to Low</option>
            <option value="a_to_z">Name: A - Z</option>
          </Input>
        </div>
      </div>
    )
  }
}

export default ProductSort;
