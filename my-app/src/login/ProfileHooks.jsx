import React from 'react'
import s from './profile.module.css'
import { Button } from '../common/btn/btn'

const Profile = (props) => {


    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }


    return <div>
        <div className={s.searchForm}>
            <Button onClick={props.logout}>logout</Button>
            <h1>SEARCH CONTACTS</h1>
            <input type="text" onChange={props.searchUsers} placeholder='search users' />
            {props.currentSearchUsers && props.currentSearchUsers.map(e => {
                return <div className={s.userWrap} key={e.id}>
                    <div className={s.user}> <div></div> {e.user}
                        {e.status ? <div></div> : <Button onClick={() => { props.addToContactList(e) }}>Add user</Button>}
                    </div>
                </div>
            })}
        </div>

        <hr />

        <h2>contacts : {localStorage.userEmail}</h2>
        {props.currentUserContacts.map((e, index) => {
            return (
                !state.editMode && e.status && <div className={s.userWrap} key={e.id}>
                    <div className={s.user}>
                        <Button onClick={() => activateEditMode(e.user, e.id)}>Change</Button>

                        {e.user}

                        <Button key={index} onClick={() => { props.deleteUser(e.user, e.id) }}>delete</Button>
                    </div>
                </div>
            )
        })}
        {state.editMode &&
            <div><input onChange={onStatusChange} value={state.status} />
                <Button onClick={deactivateEditMode}>Confirm</Button>
            </div>}
    </div>
}


export default Profile