import rootHttp from '../../root-http';
import ObjectiveActionTypes from './objective.types';
import helpers from '../../../shared/helpers';
import store from '../../store';



const http = new rootHttp();
const helper = new helpers();

export function fetchSingleObjective(objectiveName, deptName) {
    let objectives = store.getState().objective.objectives;
    if (Object.keys(objectives).length > 0) {
        return dispatch => {
            dispatch(setSingleObjective(
                objectives[deptName].find(objective => {
                    return objective.objectiveName === objectiveName
                })
            ))
        }
    }
    return dispatch => {
        http.fetchByValue("objective", deptName + "&" + objectiveName)
            .then((objective) => {
                dispatch(setSingleObjective(objective.data));
            });
    }
}
//Gets specific objective by name

export function fetchObjectivesByDepartment(deptName) {
    return dispatch => {
        http.fetchAll("objective/byDepartment/" + deptName)
            .then((objectives) => {
                dispatch(setObjectives(objectives, deptName));
            });
    }
}
//Gets all objectives for a specific department

export function addObjective(objective, callback) {
    objective = prepObjectiveValues(objective);
    return dispatch => {
        http.addItem("objective", objective)
            .then(addedObjective => {
                dispatch(addObjectiveToState(addedObjective.data));
                callback();
            });
    }
}
//Posts new objective to API

export function updateObjective(objective, callback) {
    objective = prepObjectiveValues(objective);
    return dispatch => {
        http.updateItem("objective", objective, objective.deptName + "&" + objective.objectiveName)
            .then(() => {
                dispatch(updateObjectivesInState(objective));
                callback();
            });
    }
}
//Updates objective in database

export function updateSingleObjective(objective, callback) {
    objective = prepObjectiveValues(objective);
    return dispatch => {
        http.updateItem("objective", objective, objective.deptName + "&" + objective.objectiveName)
            .then(() => {
                if (Object.keys(store.getState().objective.objectives).length > 0) {
                    dispatch(updateObjectivesInState(objective));
                }
                dispatch(setSingleObjective(objective));
                callback();
            });
    }
}
//Updates objective in database

export function deleteObjective(objectiveName, deptName) {
    return dispatch => {
        http.deleteItem("objective", deptName + "&" + objectiveName)
            .then(() => {
                dispatch(deleteObjectiveFromState(objectiveName, deptName));
            });
    }
}
//Deletes selected objective

export function addObjectiveToState(objective) {
    return {
        type: ObjectiveActionTypes.ADD_OBJECTIVE,
        payload: objective
    }
}
//Adds new objective from post to state

export function setObjectives(objectives, deptName) {
    return {
        type: ObjectiveActionTypes.SET_OBJECTIVES,
        payload: objectives,
        deptName: deptName
    }
}
//Sets all objectives in state

export function setSingleObjective(objective) {
    return {
        type: ObjectiveActionTypes.SET_SINGLE_OBJECTIVE,
        payload: objective
    }
}
//Sets selected objective in state

export function updateObjectivesInState(objective) {
    return {
        type: ObjectiveActionTypes.UPDATE_OBJECTIVES,
        payload: objective
    }
}
//Updates function for objective

export function deleteObjectiveFromState(objectiveName, deptName) {
    return {
        type: ObjectiveActionTypes.DELETE_OBJECTIVE,
        payload: objectiveName,
        deptName: deptName
    }
}
//Deletes selected objective

function prepObjectiveValues(objective) {
    objective.objectiveName = helper.capitalizeAll(objective.objectiveName);
    if (objective.funcName) {
        objective.funcName = helper.capitalize(objective.funcName);
    }

    return objective;
}