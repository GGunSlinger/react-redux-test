import React from 'react'
import s from './profile.module.css'
import { Button } from '../common/btn/btn'

class Profile extends React.Component {

    state = {
        editMode: false,
        status: this.props.status,
        id: null,
        searchValue: ''
    }

    activateEditMode = (user, id) => {
        this.setState({
            editMode: true,
            status: user,
            id
        })
    }

    deactivateEditMode = () => {
        this.props.editUser(this.state.status, this.state.id)
        this.setState({
            editMode: false
        })
    }

    onStatusChange = e => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    onSearchChange = e => {
        this.props.searchUsers(e)
        this.setState({
            searchValue: e.currentTarget.value
        })
    }

    clearSearchInput = () => {
        this.setState({
            searchValue: ''
        })
    }

    render() {
        return <div>
            <div className={s.searchForm}>
                <Button onClick={this.props.logout}>logout</Button>
                <h1>SEARCH CONTACTS</h1>
                <input onChange={(e) => { this.onSearchChange(e) }}
                    placeholder='search users'
                    value={this.state.searchValue} />
                    {this.props.currentSearchUsers && this.props.currentSearchUsers.map(e => {
                    return <div className={s.userWrap} key={e.id}>
                        <div className={s.userSearch}> <div></div> {e.user}
                            {e.status ? <div></div> :
                                <div className={s.addButton} onClick={this.clearSearchInput}>
                                    <Button onClick={() => { this.props.addToContactList(e) }}>Add user</Button>
                                </div>}
                        </div>
                    </div>
                })}
            </div>

            <hr />

            <h2>contacts : {localStorage.userEmail}</h2>
            {this.props.currentUserContacts.map((e, index) => {
                return (
                    !this.state.editMode && e.status && <div className={s.userWrap} key={e.id}>
                        <div className={s.userContacts}>
                            <Button onClick={() => this.activateEditMode(e.user, e.id)}>Change</Button>

                            {e.user}

                            <Button key={index} onClick={() => { this.props.deleteUser(e.user, e.id) }}>delete</Button>
                        </div>
                    </div>
                )
            })}
            {this.state.editMode &&
                <div><input onChange={this.onStatusChange}
                    value={this.state.status} />
                    <Button onClick={this.deactivateEditMode}>Confirm</Button>
                </div>}
        </div>
    }
}

export default Profile