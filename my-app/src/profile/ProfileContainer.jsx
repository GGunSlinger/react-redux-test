import React, { PureComponent }from 'react'
import { connect } from 'react-redux'
import { redirectToLogin } from '../hoc/redirectToLogin'
import { compose } from 'redux'
import { logoutAC, getActualUser, deleteUser, searchUsersAC, createUserContacts, editUser } from '../redux/login-reducer'
import Profile from './Profile'

class ProfileContainer extends PureComponent {

    componentDidMount() {
        this.props.getActualUser()
    }

    logout = () => {
        localStorage.removeItem("user")
        this.props.logoutAC()
    }

    deleteUser = (user, id) => {
        this.props.deleteUser(user, id)
    }

    addToContactList = value => {
        this.props.createUserContacts(value.user, value.id)
    }
    
    searchUsers = e => {
        this.props.searchUsersAC(this.props.currentUserContacts.filter(u => {
            return u.user.toLowerCase().includes(e.currentTarget.value.toLowerCase())
        }))
    }

    editUser = (user, id) => {
        this.props.editUser(user, id)
    }

    render() {
        return <Profile logout={this.logout}
            deleteUser={this.deleteUser}
            searchUsers={this.searchUsers}
            addToContactList={this.addToContactList}
            {...this.props} />
           
    }
}

let mapStateToProps = (state) => {
    return {
        createdUsers: state.loginPage.createdUsers,
        currentSearchUsers: state.loginPage.currentSearchUsers,
        currentUserContacts: state.loginPage.currentUserContacts,
        searchValue: state.loginPage.searchValue
    }
}


export default compose(redirectToLogin, connect(mapStateToProps,
    { logoutAC, getActualUser, deleteUser, searchUsersAC, createUserContacts, editUser }
))(ProfileContainer)
