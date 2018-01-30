import { reset, SubmissionError } from 'redux-form';

// Action Creators

const authRequest = () => {
    return {
        type: 'AUTHENTICATION_REQUEST'
    }
}

const authSuccess = (user, token) => {
    return {
        type: 'AUTHENTICATION_SUCCESS',
        user: user,
        token: token
    }
}

export const authFailure = (errors) => {
    return {
        type: 'AUTHENTICATION_FAILURE',
        errors: errors
    }
}

// async functions

export const signup = (user, router) => {

    const body = JSON.stringify(user)

    return dispatch => {
        dispatch(authRequest())
        
        return fetch('http://mondex-api.herokuapp.com/users', {
            method: 'post',
            body: body,
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
            .then(res => res.json())
            .then(response => {
                const { user, jwt } = response
                localStorage.setItem('token', jwt)
                dispatch(authSuccess(user, jwt))
                dispatch(reset('signup'))
                router.history.replace('/')
            })
            .catch((errors) => {
                console.log(errors)
                dispatch(authFailure(errors))
                throw new SubmissionError(errors)
            })
    }
}

export const login = (user, router) => {

    const body = JSON.stringify(user)

    return dispatch => {
        dispatch(authRequest());

        return fetch("http://mondex-api.herokuapp.com/login", {
            method: 'post',
            body: body,
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
            .then((res) => res.json())
            .then((response) => {
                const { user, token } = response;
                localStorage.setItem('token', token);
                dispatch(authSuccess(user, token))
                dispatch(reset('login'))
                router.history.replace('/')
            })
            .catch((errors) => {
                console.log(errors)
                dispatch(authFailure(errors))
                throw new SubmissionError(errors)
            })
    }
}

export const authenticate = (token) => {
    return dispatch => {
        dispatch(authRequest())
        // const body = JSON.stringify(token)

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        }

        return fetch('http://mondex-api.herokuapp.com/auth/refresh', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then((response) => {
                const { user, token } = response
                // debugger;
                localStorage.setItem('token', token)
                dispatch(authSuccess(user, token))
            })
            .catch((errors) => {
                console.log(errors);
                dispatch(authFailure(errors))
                localStorage.removeItem('token')
            })
    }
}

export const logout = (router) => {
    localStorage.removeItem('token')
    router.history.replace('/')
    return { type: 'LOGOUT' }
}