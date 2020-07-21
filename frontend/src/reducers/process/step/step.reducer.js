import StepActionTypes from './step.types';

const INITIAL_STATE = {
    steps: {},
    selectedStep: {},
    called: {}
}

const stepReducer = (state = INITIAL_STATE, action) => {
    let stepsHold = { ...state.steps }
    switch (action.type) {
        case StepActionTypes.SET_SINGLE_OBJECTIVE:
            if (!stepsHold[action.payload.deptName]) {
                stepsHold[action.payload.deptName] = {};
            }
            return {
                ...state,
                steps: stepsHold
            }
        case StepActionTypes.SET_ALL_OBJECTIVES:
            let objectives = {};
            if (stepsHold[action.deptName]) {
                objectives = stepsHold[action.deptName];
                action.payload.data.forEach(objective => {
                    if (!stepsHold[action.deptName][objective.objectiveName]) {
                        objectives[objective.objectiveName] = [];
                    }
                })
                stepsHold[action.deptName] = objectives;
            } else {
                action.payload.data.forEach(objective => {
                    objectives[objective.objectiveName] = [];
                })
                stepsHold[action.deptName] = objectives;
            }
            return {
                ...state,
                steps: stepsHold
            }
        case StepActionTypes.SET_SINGLE_STEP:
            return {
                ...state,
                selectedStep: action.payload
            };
        case StepActionTypes.SET_STEPS:
            let calledHold = { ...state.called };
            calledHold[action.deptName + "-" + action.objectiveName] = true;
            if (action.payload.data.length > 0) {
                stepsHold[action.deptName][action.objectiveName] = action.payload.data;
            } else {
                stepsHold[action.deptName][action.objectiveName] = [];
            }
            return {
                ...state,
                steps: stepsHold,
                called: calledHold
            };
        case StepActionTypes.ADD_STEP:
            stepsHold[action.payload.deptName][action.payload.objectiveName] = [
                action.payload,
                ...stepsHold[action.payload.deptName][action.payload.objectiveName]
            ].sort((first, second) => {
                if (first.stepNumber > second.stepNumber) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return {
                ...state,
                steps: stepsHold
            };
        case StepActionTypes.UPDATE_STEPS:
            stepsHold[action.payload.deptName][action.payload.objectiveName] = [
                action.payload,
                ...stepsHold[action.payload.deptName][action.payload.objectiveName]
                    .filter((value) => {
                        return value.stepNumber !== action.payload.stepNumber;
                    })]
                .sort((first, second) => {
                    if (first.stepNumber > second.stepNumber) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            return {
                ...state,
                steps: stepsHold
            };
        case StepActionTypes.DELETE_STEP:
            stepsHold[action.deptName][action.objectiveName] = [
                ...stepsHold[action.deptName][action.objectiveName]
                    .filter((value) => {
                        return value.stepNumber !== action.payload;
                    })]
            return {
                ...state,
                steps: stepsHold
            };
        case StepActionTypes.SIGNOUT_USER:
            return {
                steps: {},
                selectedStep: {},
                called: {}
            };
        default:
            return state;
    }
}

export default stepReducer;