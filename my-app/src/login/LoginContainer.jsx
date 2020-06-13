import React from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { registerNewUser, LoginAC } from '../redux/login-reducer'
import { redirectToProfile } from '../hoc/redirectToProfile'


class LoginContainer extends React.Component {

    UserLogin = (value, currentUser) => {
        this.props.LoginAC(value, currentUser)
    }

    render() {
        return <Login 
            UserLogin={this.UserLogin}
            createdUsers={this.props.createdUsers}
            localStorageUser={this.props.localStorageUser} />
    }


}
let mapStateToProps = (state) => {
    return {
        createdUsers: state.loginPage.createdUsers,
        localStorageUser: state.loginPage.localStorageUser
    }
}


export default compose(redirectToProfile, connect(mapStateToProps, { registerNewUser, LoginAC }))(LoginContainer);