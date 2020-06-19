import * as axios from "axios";

const CREATE_USER_SESSION = 'CREATE_USER_SESSION'
const LOGOUT = 'LOGOUT'
const SEARCH_USERS = 'SEARCH_USERS'
const CURRENT_CONTACTS = 'CURRENT_CONTACTS'
const CLEAR_SEARCH_USERS = 'CLEAR_SEARCH_USERS'

let initialState = {
    currentUserContacts: [],
    localStorageUser: localStorage.user,
    currentSearchUsers: []
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_CONTACTS:
            return {
                ...state,
                currentUserContacts: [...action.value]
            }
        case CREATE_USER_SESSION:
            return {
                ...state,
                localStorageUser: localStorage.user
            }
        case LOGOUT:
            return {
                ...state,
                localStorageUser: undefined
            }
        case SEARCH_USERS:
            return {
                ...state,
                currentSearchUsers: action.users.filter(u => u.user !== localStorage.userEmail)
            }
        case CLEAR_SEARCH_USERS:
            return {
                ...state,
                currentSearchUsers: null
            }
        default:
            return state

    }

}

export const userSession = (value) => ({ type: CREATE_USER_SESSION, value })
export const logoutAC = (value) => ({ type: LOGOUT, value })
export const searchUsersAC = (users) => ({ type: SEARCH_USERS, users })
export const currentUserContacts = (value) => ({ type: CURRENT_CONTACTS, value })
export const clearSearchUsers = () => ({ type: CLEAR_SEARCH_USERS })


const url = 'http://localhost:8080/'

export const registerNewUser = (value) => (dispatch) => {
    axios.post(url + 'register', {
        "email": value.login,
        "password": value.password
    }).then(res => {
        axios.post(url + 'contacts', {
            "user": value.login,
            "status": false
        })
        alert('successful registration')
    }).catch(error => {
        alert('email address already registered')
    })

}


export const deleteUser = (user, id) => (dispatch) => {
    axios.put(url + `contacts/${id}`, {
        "user": user,
        "status": false
    }).then(e => {
        axios.get(url + 'contacts').then(res => {
            dispatch(currentUserContacts(res.data))
            dispatch(clearSearchUsers())
        })
    })
}


export const getActualUser = () => (dispatch) => {
    axios.get(url + 'contacts').then(res => {
        dispatch(currentUserContacts(res.data))
    })
}


export const login = (value) => (dispatch) => {
    axios.post(url + 'login', {
        "email": value.login,
        "password": value.password
    }).then(res => {
        if (res.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(res.data))
            localStorage.setItem('userEmail', (value.login))
            dispatch(userSession(localStorage.user))
        }
    }).catch(error => {
        alert('wrong password or email')
    })
}


export const createUserContacts = (value) => (dispatch) => {
    axios.put(url + `contacts/${value.id}`, {
        "user": value.user,
        "status": true
    }).then(res => {
        axios.get(url + 'contacts').then(res => {
            dispatch(clearSearchUsers())
            dispatch(currentUserContacts(res.data))
        })
    })
}


export const editUser = (user, id) => (dispatch) => {
    axios.put(url + `contacts/${id}`, {
        "user": user,
        "status": true
    }).then(res => {
        axios.get(url + 'contacts').then(res => {
            dispatch(currentUserContacts(res.data))
        })
    })
}






export default loginReducer;