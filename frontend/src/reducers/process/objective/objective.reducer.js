import ObjectiveActionTypes from './objective.types';

const INITIAL_STATE = {
    objectives: {},
    selectedObjective: {},
    called: false
}

const objectiveReducer = (state = INITIAL_STATE, action) => {
    let objectiveHold = { ...state.objectives };
    switch (action.type) {
        case ObjectiveActionTypes.SET_SINGLE_OBJECTIVE:
            return {
                ...state,
                selectedObjective: action.payload
            };
        case ObjectiveActionTypes.SET_OBJECTIVES:
            if (action.payload.data.length > 0) {
                objectiveHold[action.deptName] = action.payload.data;
            } else {
                objectiveHold[action.deptName] = [];
            }
            return {
                ...state,
                objectives: objectiveHold,
                called: true
            };
        case ObjectiveActionTypes.ADD_OBJECTIVE:
            objectiveHold[action.payload.deptName].push(action.payload)
            return {
                ...state,
                objectives: objectiveHold
            };
        case ObjectiveActionTypes.UPDATE_OBJECTIVES:
            objectiveHold[action.payload.deptName] = objectiveHold[action.payload.deptName]
                .filter((value) => {
                    return value.objectiveName !== action.payload.objectiveName
                })
            objectiveHold[action.payload.deptName].push(action.payload)
            objectiveHold[action.payload.deptName] = objectiveHold[action.payload.deptName]
                .sort((first, second) => {
                    if (first.objectiveName > second.objectiveName) {
                        return 1
                    } else {
                        return -1
                    }
                })
            return {
                ...state,
                objectives: objectiveHold
            };
        case ObjectiveActionTypes.DELETE_OBJECTIVE:
            objectiveHold[action.deptName] = objectiveHold[action.deptName]
                .filter((value) => {
                    return value.objectiveName !== action.payload
                })
            return {
                ...state,
                objectives: objectiveHold
            };
        case ObjectiveActionTypes.SIGNOUT_USER:
            return {
                objectives: {},
                selectedObjective: {},
                called: false
            };
        case ObjectiveActionTypes.ADD_DEPARTMENT:
            objectiveHold[action.payload.deptName] = [];
            return {
                ...state,
                objectives: objectiveHold
            };
        default:
            return state;
    }
}

export default objectiveReducer;