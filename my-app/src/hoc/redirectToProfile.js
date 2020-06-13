import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

let mapStateToPropsForRedirect = (state) => ({
    localStorageUser: state.loginPage.localStorageUser
})

export const redirectToProfile = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
                if (this.props.localStorageUser !== undefined) return <Redirect to={'/profile'} />
                return <Component {...this.props} />
        }
    }

    let connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent)

    return connectedAuthRedirectComponent
}