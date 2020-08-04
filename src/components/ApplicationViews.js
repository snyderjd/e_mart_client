import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Auth from './auth/Auth';
import ProductList from './products/ProductList';
import ProductForm from './products/ProductForm';
import ProductDetail from './products/ProductDetail';

class ApplicationViews extends Component {
    state = {}

    isAdmin = () => {
        if (this.props.currentUser.role === "admin") {
            return true
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Welcome to EMart!</h1>
                <Route exact path="/auth" render={props => {
                    return <Auth {...props} login={this.props.login} />
                }} />

                <Route exact path="/products" render={props => {
                    return <ProductList {...props} />
                }} />

                <Route exact path="/products/create" render={props => {
                    // Renders form for admins to add new products
                    if (this.isAdmin()) {
                        return <ProductForm {...props} />
                    }
                }} />

                <Route exact path="/products/:productId(\d+)" render={props => {
                    // pass the productId to the ProductDetail component
                    return <ProductDetail productId={parseInt(props.match.params.productId)} {...props} />
                }} />
            </React.Fragment>
        )
    }

}

export default ApplicationViews;

// import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
// import Auth from './auth/Auth';
// import SkillList from './skills/SkillList';
// import ResourceList from './resources/ResourceList';
// import Search from './search/Search';
// import VideoSearch from './videos/VideoSearch';
// import WebSearch from './web/WebSearch';
// import SearchHome from './search/SearchHome';

// class ApplicationViews extends Component {
//     state = {
//         activeUserId: parseInt(sessionStorage.getItem("activeUserId")),
//     }

//     isAuthenticated = () => sessionStorage.getItem("activeUserId") !== null
    
//     render() {
//         return (
//             <React.Fragment>
                
//                 <Route exact path="/" render={props => {
//                     return <SearchHome {...props} />
//                 }} />

//                 <Route exact path="/auth" render={props => {
//                     return <Auth {...props} login={this.props.login} />
//                 }} />

//                 <Route exact path="/skills" render={props => {
//                     if (this.isAuthenticated()) {
//                         return <SkillList {...props} />
//                     }
//                     return <Auth {...props} />
//                 }} />

//                 <Route exact path="/skills/:skillId(\d+)" render={props => {
//                     // pass the skillId to the ResourceList component
//                     if (this.isAuthenticated()) {
//                         return <ResourceList skillId={parseInt(props.match.params.skillId)}
//                                              activeUserId={this.state.activeUserId} 
//                                              {...props} /> 
//                     }
//                     return <Auth {...props} />
                    
//                 }} />

//                 <Route exact path="/search" render={props => {
//                     if (this.isAuthenticated()) {
//                         return <Search {...props} />
//                     }
//                     return <Auth {...props} />
//                 }} />

//                 <Route exact path="/video" render={props => {
//                     if (this.isAuthenticated()) {
//                         return <VideoSearch {...props} />
//                     }
//                     return <Auth {...props} />
//                 }} />

//                 <Route exact path="/web" render={props => {
//                     if (this.isAuthenticated()) {
//                         return <WebSearch {...props} />
//                     }
//                     return <Auth {...props} />
//                 }} />

//             </React.Fragment>
//         )
//     }
// }

// export default ApplicationViews;