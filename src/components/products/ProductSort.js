import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import './Products.css';

class ProductSort extends Component {

  handleSort = (event) => {
    event.preventDefault();

    
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
            <option value="default">Default</option>
            <option value="price_ascending">Price: Low to High</option>
            <option value="price_descening">Price: High to Low</option>
          </Input>
        </div>
      </div>
    )
  }

//       <div className="ProductFilter__container">
//         <div className="ProductFilter__inputGroup">
//           <Label className="ProductFilter__label" htmlFor="category_id">Filter by Category:</Label>
//           <Input 
//             className="ProductFilter__input" 
//             type="select" 
//             name="category_id" 
//             id="category_id"
//             onChange={this.handleFilter}>
//             <option value="all_categories">All Categories</option>
//             {this.state.categories.map(category => 
//               <option key={category.id} value={category.id}>{category.name}</option>  
//             )}
//           </Input>
//         </div>
//       </div>
}

export default ProductSort;

// import React, { Component } from 'react';
// import { Label, Input } from 'reactstrap';
// import CategoryDataManager from '../../modules/CategoryDataManager';
// import './Products.css';

// class ProductFilter extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       categories: []
//     };
//   }

//   componentDidMount() {
//     CategoryDataManager.getAllCategories()
//       .then(categories => {
//         this.setState({ categories });
//       });
//   }

//   handleFilter = (event) => {
//     event.preventDefault();
//     const categoryId = event.target.value;
//     this.props.executeProductFilter(categoryId);
//   }

//   render() {
//     return (
//       <div className="ProductFilter__container">
//         <div className="ProductFilter__inputGroup">
//           <Label className="ProductFilter__label" htmlFor="category_id">Filter by Category:</Label>
//           <Input 
//             className="ProductFilter__input" 
//             type="select" 
//             name="category_id" 
//             id="category_id"
//             onChange={this.handleFilter}>
//             <option value="all_categories">All Categories</option>
//             {this.state.categories.map(category => 
//               <option key={category.id} value={category.id}>{category.name}</option>  
//             )}
//           </Input>
//         </div>
//       </div>
//     )
//   }  
// }

// export default ProductFilter;