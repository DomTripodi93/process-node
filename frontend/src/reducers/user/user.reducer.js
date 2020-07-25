import UserActionTypes from './user.types';

const INITIAL_STATE = {
    userToken: null,
    userId: null,
    isAuthenticated: false,
    settings: {},
    rootId: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGNIN_USER:
            return {
                ...state,
                userToken: action.payload.token,
                userId: action.payload.id,
                isAuthenticated: true,
                settings: action.payload.settings,
                rootId: action.payload.rootId
            };
        case UserActionTypes.SIGNOUT_USER:
            return {
                ...state,
                userToken: null,
                userId: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export default userReducer;