import React, { useReducer, createContext } from 'react';

//Context
export const AuthContext = createContext()

let loginStatus = () => {
    if (localStorage.getItem('accessToken') && (typeof localStorage.getItem('accessToken') !== 'undefined')) {
        return true;
    }
    else {
        return false;
    }
}

let getToken = () => {
    let user = localStorage.getItem('session') ? JSON.parse(window.atob(localStorage.getItem('session'))) : null;
    return localStorage.getItem('session') ? user.accessToken : null;
}

let getRefreshToken = () => {
    return localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : 0;
}

let getUserSession = () => {
    return localStorage.getItem('session') ? JSON.parse(window.atob(localStorage.getItem('session'))) : null;
}

let getUser = () => {
    let user = localStorage.getItem('session') ? JSON.parse(window.atob(localStorage.getItem('session'))) : null;
    return localStorage.getItem('session') ? user.data : null;
}
//Inisiasi state
const initialState = {
    isAuthenticated: loginStatus(),
    data: getUserSession(),
    user: getUser(),
    token: getToken(),
    refreshToken: getRefreshToken()
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("session", window.btoa(JSON.stringify(action.payload)))
            localStorage.setItem("baseID", window.btoa(JSON.stringify(action.payload.data.ID_USER)))
            localStorage.setItem("accessToken", action.payload.accessToken)
            localStorage.setItem("refreshToken", action.payload.refreshToken)
            return {
                ...state,
                isAuthenticated: true,
                data: action.payload,
                user: action.payload.data,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        case "LOGOUT":
            localStorage.removeItem('accessToken')
            localStorage.removeItem('baseID')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('session')
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }

        default:
            return state
    }
}

function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>

    );
}

export default UserProvider;