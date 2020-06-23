import { usersAPI, authAPI, profileAPI } from "../api/api"

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

const usersFlow = async (dispatch, actionCreater, apiGetUsers) => {
    let res = await apiGetUsers()
    dispatch(clearSearchUsers())
    dispatch(actionCreater(res.data))
}

export const registerNewUser = (value) => async () => {
    try {
        await authAPI.registerUser(value.login, value.password)
        await authAPI.registerContact(value.login)
        alert('successful registration')
    } catch (e) {
        alert('email address already registered')
    }
}

export const deleteUser = (user, id) => async (dispatch) => {
    await profileAPI.deleteContact(user, id)
    usersFlow(dispatch, currentUserContacts, usersAPI.getUsers)
}

export const getActualUser = () => async (dispatch) => {
    usersFlow(dispatch, currentUserContacts, usersAPI.getUsers)
}

export const login = (value) => async (dispatch) => {
    let res = await authAPI.login(value.login, value.password)
    if (res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('userEmail', (value.login))
        dispatch(userSession(localStorage.user))
    } else { alert('wrong password or email') }
}


export const createUserContacts = (user, id) => async (dispatch) => {
    await usersAPI.setContacts(user, id)
    usersFlow(dispatch, currentUserContacts, usersAPI.getUsers)
}


export const editUser = (user, id) => async (dispatch) => {
    await usersAPI.setContacts(user, id)
    usersFlow(dispatch, currentUserContacts, usersAPI.getUsers)
}

export default loginReducer;
