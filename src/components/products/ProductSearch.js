import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

import './Products.css';

class ProductSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: ""
    };
  }

  // Update state when input fields change
  handleFieldChange = (event) => {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSearch = (event) => {
    // Calls function passed down from ProductList, passing in the searchInput from state
    event.preventDefault();

    this.props.executeProductSearch(this.state.searchInput);
  }

  render() {
    console.log("ProductSearch state", this.state);

    return (
      <div className="ProductSearch__container">
        <InputGroup>
          <Input 
            id="searchInput" 
            type="text" 
            placeholder="Search for products"
            onChange={this.handleFieldChange}
          />
          <InputGroupAddon>
            <Button color="primary" onClick={this.handleSearch}>
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>        
      </div>
    )
  }
}

export default ProductSearch;

// import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';


{/* <InputGroup>
  <Input />
    <InputGroupAddon addonType="append">
    <Button color="secondary">To the Right!</Button>
    </InputGroupAddon>
</InputGroup> */}

    
