import BestPracticeActionTypes from './best-practice.types';

const INITIAL_STATE = {
    bestPractices: []
}

const bestPracticeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BestPracticeActionTypes.SET_BEST_PRACTICES:
            return {
                ...state,
                bestPractices: action.payload.data
            };
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
        case BestPracticeActionTypes.DELETE_BEST_PRACTICE:
            return {
                ...state,
                bestPractices: [...state.bestPractices
                    .filter((value) => {
                        return value.id !== action.payload
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