import ChangeLogActionTypes from './change-log.types';

const INITIAL_STATE = {
    changes: {}
}

const ChangeLogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ChangeLogActionTypes.SET_CHANGES:
            let changeHold = {...state.changes}
            changeHold[action.model] = action.payload.data;
            return {
                changes: changeHold
            };
        case ChangeLogActionTypes.SIGNOUT_USER:
            return {
                changes: {}
            };
        default:
            return state;
    }
}

export default ChangeLogReducer;