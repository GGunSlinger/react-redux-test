import * as axios from "axios";

const instance = axios.create({ baseURL: 'http://localhost:8080/' })

export const usersAPI = {
    getUsers() {
        return instance.get('contacts')
    },
    setContacts(user, id) {
        return instance.put(`contacts/${id}`, {
            "user": user,
            "status": true
        })
    }
}

export const profileAPI = {
    deleteContact(login, id) {
        return instance.put(`contacts/${id}`, {
            "user": login,
            "status": false
        })
    }
}

export const authAPI = {
    registerUser(login, password) {
        return instance.post('register', {
            "email": login,
            "password": password
        })
    },
    registerContact(login) {
        return instance.post('contacts', {
            "user": login,
            "status": false
        })
    },
    login(login, password) {
        return instance.post('login', {
            "email": login,
            "password": password
        })
    }
}



