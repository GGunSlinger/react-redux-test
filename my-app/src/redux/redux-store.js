import {combineReducers, createStore, applyMiddleware} from "redux"
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import loginReducer from './login-reducer'

let reducers = combineReducers({
    loginPage: loginReducer,
    form: formReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store