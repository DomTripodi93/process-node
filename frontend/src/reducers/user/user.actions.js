import UserActionTypes from './user.types';
import axios from 'axios';
import helpers from '../../shared/helpers';

const helper = new helpers();
const ROOT_URL = 'http://localhost:5000/api';

export const registerUser = (user, callback) => {
    user.name = helper.capitalize(user.name);

    axios.post(`${ROOT_URL}/auth/register`, user).then(() => callback());
    return {
        type: UserActionTypes.REGISTER_USER
    }
};

export const signInUser = (user, callback) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/auth/login`, user)
            .then(response => {
                dispatch(setUserData(response.data));
                callback();
            })
    }
};

export const setUserData = (user) => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('id', user.id);

    return {
        type: UserActionTypes.SIGNIN_USER,
        payload: user
    };
};

export const signOutUser = (callback) => {
    localStorage.setItem('token', "");
    localStorage.setItem('id', "");
    callback();

    return {
        type: UserActionTypes.SIGNOUT_USER
    };
};

export const checkUser = (id, token) => {
    return dispatch => {
        axios.get(`${ROOT_URL}/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((user) => {
                console.log(user)
                dispatch(
                    setUserData({
                        token: token,
                        id: id,
                        settings: user.data.settings
                    })
                )
            })
            .catch(() => {
                dispatch(
                    signOutUser(() => { })
                )
            });
    }
}