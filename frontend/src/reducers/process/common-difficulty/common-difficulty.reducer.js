import CommonDifficultyActionTypes from './common-difficulty.types';

const INITIAL_STATE = {
    commonDifficulties: [],
    commonDifficultiesByStep: {}
}

const commonDifficultyReducer = (state = INITIAL_STATE, action) => {
    let commonDifficultiesHold = { ...state.commonDifficultiesByStep }
    switch (action.type) {
        case CommonDifficultyActionTypes.SET_COMMON_DIFFICULTIES:
            return {
                ...state,
                commonDifficulties: action.payload.data
            };
        case CommonDifficultyActionTypes.SET_COMMON_DIFFICULTIES_BY_STEP:
            commonDifficultiesHold[action.key] = action.payload;
            return {
                ...state,
                commonDifficultiesByStep: commonDifficultiesHold
            }
        case CommonDifficultyActionTypes.ADD_COMMON_DIFFICULTY:
            return {
                ...state,
                commonDifficulties: [...state.commonDifficulties, action.payload]
            };
        case CommonDifficultyActionTypes.UPDATE_COMMON_DIFFICULTIES:
            return {
                ...state,
                commonDifficulties: [
                    action.payload,
                    ...state.commonDifficulties
                        .filter((value) => {
                            return value._id !== action.payload._id
                        })
                ]
                    .sort((first, second) => {
                        if (first._id > second._id) {
                            return 1
                        } else {
                            return -1
                        }
                    }
                    )
            };
        case CommonDifficultyActionTypes.DELETE_COMMON_DIFFICULTY:
            return {
                ...state,
                commonDifficulties: [...state.commonDifficulties
                    .filter((value) => {
                        return value._id !== action.payload
                    })
                ]
            };
        case CommonDifficultyActionTypes.SIGNOUT_USER:
            return {
                commonDifficulties: [],
                commonDifficultiesByStep: {}
            };
        default:
            return state;
    }
}

export default commonDifficultyReducer;