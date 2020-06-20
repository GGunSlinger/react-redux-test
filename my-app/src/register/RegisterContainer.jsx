import React from 'react'
import RegisterPage from './RegisterPage'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { registerNewUser, login } from '../redux/login-reducer'
import { redirectToProfile } from '../hoc/redirectToProfile'

class RegisterContainer extends React.Component {

    addNewUser = (value) => {
        this.props.registerNewUser(value)
    }

    UserLogin = (value) => {
        this.props.login(value)
    }

    render() {
        return <RegisterPage addNewUser={this.addNewUser}
            UserLogin={this.UserLogin}
            createdUsers={this.props.createdUsers}
            actualUsers={this.props.actualUsers}/>
    }


}
let mapStateToProps = (state) => {
    return {
        createdUsers: state.loginPage.createdUsers,
        actualUsers: state.loginPage.actualUsers
    }
}


export default compose(redirectToProfile, connect(mapStateToProps, { registerNewUser, login }))(RegisterContainer);

