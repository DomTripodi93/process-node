import rootHttp from '../../root-http';
import StepActionTypes from './step.types';
import helpers from '../../../shared/helpers';
import store from '../../store';


const http = new rootHttp();
const helper = new helpers();

export function fetchSingleStep(stepNumber, objectiveName, deptName) {
    return dispatch => {
        http.fetchByValue("step", deptName + "&" + objectiveName + "&" + stepNumber)
            .then((step) => {
                dispatch(setSingleStep(step.data));
            });
    }
}
//Gets specific step by name

export function fetchStepsByDepartmentAndObjective(deptName, objectiveName) {
    return dispatch => {
        http.fetchAll("step/byObjective/" + deptName + "&" + objectiveName)
            .then((steps) => {
                dispatch(setSteps(steps, deptName, objectiveName));
            });
    }
}
//Gets all steps for a specific department

export function addStep(step, callback) {
    step = prepStepValues(step);
    return dispatch => {
        http.addItem("step", step)
            .then(addedStep => {
                dispatch(addStepToState(addedStep.data));
                callback();
            });
    }
}
//Posts new step to API

export function updateStep(step, callback) {
    step = prepStepValues(step);
    return dispatch => {
        http.updateItem("step", step, step.deptName + "&" + step.objectiveName + "&" + step.stepNumber)
            .then(() => {
                dispatch(updateStepsInState(step));
                callback();
            });
    }
}
//Updates step in database

export function updateSingleStep(step, callback) {
    step = prepStepValues(step);
    return dispatch => {
        http.updateItem("step", step, step.deptName + "&" + step.objectiveName + "&" + step.stepNumber)
            .then(() => {
                if (Object.keys(store.getState().step.steps).length > 0) {
                    dispatch(updateStepsInState(step));
                }
                dispatch(setSingleStep(step));
                callback();
            });
    }
}
//Updates objective in database

export function deleteStep(stepNumber, objectiveName, deptName) {
    return dispatch => {
        http.deleteItem("step", deptName + "&" + objectiveName + "&" + stepNumber)
            .then(() => {
                dispatch(deleteStepFromState(stepNumber, deptName, objectiveName));
            });
    }
}
//Deletes selected step

export function addStepToState(step) {
    return {
        type: StepActionTypes.ADD_STEP,
        payload: step
    }
}
//Adds new step from post to state

export function setSteps(steps, deptName, objectiveName) {
    return {
        type: StepActionTypes.SET_STEPS,
        payload: steps,
        deptName,
        objectiveName
    }
}
//Sets all steps in state

export function setSingleStep(step) {
    return {
        type: StepActionTypes.SET_SINGLE_STEP,
        payload: step
    }
}
//Sets selected step in state

export function updateStepsInState(step) {
    return {
        type: StepActionTypes.UPDATE_STEPS,
        payload: step
    }
}
//Updates function for step

export function deleteStepFromState(stepNumber, deptName, objectiveName) {
    return {
        type: StepActionTypes.DELETE_STEP,
        payload: stepNumber,
        deptName,
        objectiveName
    }
}
//Deletes selected step

function prepStepValues(step) {
    step.name = helper.capitalizeAll(step.name);
    if (step.goal) {
        step.goal = helper.capitalize(step.goal);
    }

    return step;
}