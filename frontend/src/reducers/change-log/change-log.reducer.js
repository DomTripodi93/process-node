import ChangeLogActionTypes from './change-log.types';

const INITIAL_STATE = {
    changes: {},
    moreResults: {}
}

const ChangeLogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ChangeLogActionTypes.SET_CHANGES:
            let changeHold = { ...state.changes }
            changeHold[action.model] = { [action.page]: action.payload.data };
            let moreResultHold = { ...state.moreResults };
            if (action.payload.data.length === 10) {
                moreResultHold[action.model] = true;
            } else {
                moreResultHold[action.model] = false;
            }
            return {
                changes: changeHold,
                moreResult: moreResultHold
            }
        case ChangeLogActionTypes.SIGNOUT_USER:
            return {
                changes: {},
                moreResults: {}
            }
        default:
            return state;
    }
}

export default ChangeLogReducer;