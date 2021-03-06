import ObjectiveActionTypes from './objective.types';

const INITIAL_STATE = {
    objectives: {},
    employeeObjectives: {},
    selectedObjective: {},
    called: false,
    moreResults: {}
}

const objectiveReducer = (state = INITIAL_STATE, action) => {
    let objectiveHold = { ...state.objectives };
    let moreResultsHold = { ...state.moreResults };
    switch (action.type) {
        case ObjectiveActionTypes.SET_SINGLE_OBJECTIVE:
            return {
                ...state,
                selectedObjective: action.payload
            };
        case ObjectiveActionTypes.SET_OBJECTIVES:
            if (action.payload.data.length === 10) {
                moreResultsHold[action.deptName] = true;
            } else {
                moreResultsHold[action.deptName] = false;
            }
            if (action.payload.data.length > 0) {
                if (action.page) {
                    if (objectiveHold[action.deptName]) {
                        objectiveHold[action.deptName][action.page] = action.payload.data;
                    } else {
                        objectiveHold[action.deptName] = { [action.page]: action.payload.data };
                    }
                } else {
                    objectiveHold[action.deptName] = action.payload.data;
                }
            } else {
                if (!objectiveHold[action.deptName]) {
                    objectiveHold[action.deptName] = { [action.page]: action.payload.data };
                }
            }
            return {
                ...state,
                objectives: objectiveHold,
                called: true,
                moreResults: moreResultsHold
            };
        case ObjectiveActionTypes.SET_OBJECTIVES_FOR_EMPLOYEE:
            let employeeObjectivesHold = { ...state.employeeObjectives };
            employeeObjectivesHold[action.keyVal] = action.payload.data;
            return {
                ...state,
                employeeObjectives: employeeObjectivesHold
            };

        case ObjectiveActionTypes.ADD_OBJECTIVE:
            let pageNumber = 1;
            while(true){
                if (objectiveHold[action.payload.deptName][pageNumber]){
                    if (objectiveHold[action.payload.deptName][pageNumber].length !== 10){
                        if (objectiveHold[action.payload.deptName][pageNumber].length === 9){
                            moreResultsHold[action.payload.deptName][pageNumber] = true;
                        }
                        objectiveHold[action.payload.deptName][pageNumber].push(action.payload);
                        objectiveHold[action.payload.deptName][pageNumber].sort((first, second) => {
                            if (first.objectiveName > second.objectiveName) {
                                return 1
                            } else {
                                return -1
                            }
                        })
                        break;
                    }
                } else {
                    break;
                }
            }
            return {
                ...state,
                objectives: objectiveHold,
                moreResults: moreResultsHold
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
                employeeObjectives: {},
                selectedObjective: {},
                called: false,
                moreResults: {}
            };
        case ObjectiveActionTypes.ADD_DEPARTMENT:
            objectiveHold[action.payload.deptName] = {1: []};
            moreResultsHold[action.payload.deptName] = true;
            return {
                ...state,
                objectives: objectiveHold,
                moreResults: moreResultsHold
            };
        default:
            return state;
    }
}

export default objectiveReducer;