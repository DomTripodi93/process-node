import CommonDifficultyActionTypes from './common-difficulty.types';

const INITIAL_STATE = {
    commonDifficulties: []
}

const commonDifficultyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CommonDifficultyActionTypes.SET_COMMON_DIFFICULTIES:
            return {
                ...state,
                commonDifficulties: action.payload.data
            };
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
                            return value.id !== action.payload.id
                        })
                ]
                    .sort((first, second) => {
                        if (first.id > second.id) {
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
                        return value.id !== action.payload
                    })
                ]
            };
        case CommonDifficultyActionTypes.SIGNOUT_USER:
            return {
                commonDifficulties: []
            };
        default:
            return state;
    }
}

export default commonDifficultyReducer;