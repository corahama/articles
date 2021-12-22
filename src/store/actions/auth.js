import axios from 'axios';
import * as actionTypes from './actionTypes';
// import { getCookie } from '../../utils';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(SERVICE_URL + '/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            localStorage.setItem('token', token);
            dispatch(authSuccess(token));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data));
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(SERVICE_URL + '/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key;
            localStorage.setItem('token', token);
            dispatch(authSuccess(token));
        })
        .catch(err => {
            dispatch(authFail(err.response.data));
        })
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === null) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
        }
    }
}

// fetch(SERVICE_URL + '/rest-auth/login/', {
//     credentials: 'include',
//     method: 'POST',
//     mode: 'same-origin',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'X-CSRFToken': getCookie('csrftoken')
//     },
//     body: {
//         username: username,
//         password: password
//     }
// })
