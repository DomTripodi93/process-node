import BestPracticeActionTypes from './best-practice.types';

const INITIAL_STATE = {
    bestPractices: [],
    bestPracticesByStep: {}
}

const bestPracticeReducer = (state = INITIAL_STATE, action) => {
    let bestPracticesHold = {...state.bestPracticesByStep}
    switch (action.type) {
        case BestPracticeActionTypes.SET_BEST_PRACTICES:
            return {
                ...state,
                bestPractices: action.payload.data
            };
        case BestPracticeActionTypes.SET_BEST_PRACTICES_BY_STEP:
            bestPracticesHold[action.key] = action.payload;
            return {
                ...state,
                bestPracticesByStep: bestPracticesHold
            }

        case BestPracticeActionTypes.ADD_BEST_PRACTICE:
            return {
                ...state,
                bestPractices: [...state.bestPractices, action.payload]
            };
        case BestPracticeActionTypes.UPDATE_BEST_PRACTICES:
            return {
                ...state,
                bestPractices: [
                    action.payload,
                    ...state.bestPractices
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
        case BestPracticeActionTypes.DELETE_BEST_PRACTICE:
            return {
                ...state,
                bestPractices: [...state.bestPractices
                    .filter((value) => {
                        return value._id !== action.payload
                    })
                ]
            };
        case BestPracticeActionTypes.SIGNOUT_USER:
            return {
                bestPractices: []
            };
        default:
            return state;
    }
}

export default bestPracticeReducer;