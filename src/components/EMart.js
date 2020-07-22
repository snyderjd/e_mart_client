import React, { Component } from 'react';
import NavBar from './nav/NavBar.js';
import ApplicationViews from './ApplicationViews';
import UserDataManager from './auth/UserDataManager';
import { useCookies } from 'react-cookie';
import './EMart.css';

class EMart extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    logout = () => {
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }

    login = (authObject) => {
        UserDataManager.postUserToken(authObject)
            .then(response => {
                if (response.jwt) {
                    document.cookie = `token=Bearer ${response.jwt}`;
                    console.log(response)
                } else {
                    // Figure out how to handle unsuccessful response from the API
                }
            });
    }

//     logout = () => {
//         sessionStorage.clear();
//         this.setState({ username: "" })
//     }

//     login = () => {
//         this.setState({ activeUserId: sessionStorage.getItem("activeUserId")})
//         UserDataManager.getUser(this.state.activeUserId).then(user => {
//             this.setState({
//                 username: user.username,
//                 activeUserId: sessionStorage.getItem("activeUserId")
//             })
//         })
//     }    

    render() {
        return (
            <React.Fragment>
                <NavBar {...this.props} logout={this.logout} />
                <ApplicationViews login={this.login} />
            </React.Fragment>
        )
    }

}

export default EMart;

// import React, { Component } from 'react';
// import NavBar from './nav/NavBar';
// import ApplicationViews from './ApplicationViews';
// import UserDataManager from './auth/UserDataManager';
// import './SkillSource.css';

// class SkillSource extends Component {
//     state = {
//         activeUserId: parseInt(sessionStorage.getItem("activeUserId")),
//         username: ""
//     }
    
//     // componentDidMount() {
//     //     UserDataManager.getUser(this.state.activeUserId).then(user => {
//     //         this.setState({ username: user.username })
//     //     })
//     // }

//     logout = () => {
//         sessionStorage.clear();
//         this.setState({ username: "" })
//     }

//     login = () => {
//         this.setState({ activeUserId: sessionStorage.getItem("activeUserId")})
//         UserDataManager.getUser(this.state.activeUserId).then(user => {
//             this.setState({
//                 username: user.username,
//                 activeUserId: sessionStorage.getItem("activeUserId")
//             })
//         })
//     }
    
//     render() {
//         return (
//             <React.Fragment>
//                 <NavBar {...this.props} logout={this.logout} username={this.state.username} />
//                 <ApplicationViews login={this.login}/>
//             </React.Fragment>
//         )
//     }
// }

// export default SkillSource;