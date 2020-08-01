import UserActionTypes from './user.types';

const INITIAL_STATE = {
    userToken: null,
    userId: null,
    isAuthenticated: false,
    rootId: null,
    isRoot: false,
    canEdit: false,
    defaultEmployeePassword: ""
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
                rootId: action.payload.rootId,
                isRoot: isRootHold,
                canEdit: action.payload.canEdit,
                defaultEmployeePassword: action.payload.defaultEmployeePassword
            };
        case UserActionTypes.SIGNOUT_USER:
            return {
                ...state,
                userToken: null,
                userId: null,
                isAuthenticated: false,
                rootId: null,
                isRoot: false,
                canEdit: false,
                defaultEmployeePassword: ""
            };
        default:
            return state;
    }
}

export default userReducer;