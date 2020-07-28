import UserActionTypes from './user.types';

const INITIAL_STATE = {
    userToken: null,
    userId: null,
    isAuthenticated: false,
    settings: {},
    rootId: null,
    isRoot: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    let isRootHold = state.isRoot;
    switch (action.type) {
        case UserActionTypes.SIGNIN_USER:
            isRootHold = (action.payload.id === action.payload.rootId);
            return {
                ...state,
                userToken: action.payload.token,
                userId: action.payload.id,
                isAuthenticated: true,
                settings: action.payload.settings,
                rootId: action.payload.rootId,
                isRoot: isRootHold
            };
        case UserActionTypes.SIGNOUT_USER:
            return {
                ...state,
                userToken: null,
                userId: null,
                isAuthenticated: false,
                settings: {},
                rootId: null,
                isRoot: false
            };
        default:
            return state;
    }
}

export default userReducer;