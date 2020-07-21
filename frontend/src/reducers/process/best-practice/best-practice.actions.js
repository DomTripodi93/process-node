import rootHttp from '../../root-http';
import BestPracticeActionTypes from './best-practice.types';
import helpers from '../../../shared/helpers';


const http = new rootHttp();
const helper = new helpers();

export function fetchBestPracticesByStep(deptName, objectiveName, stepNumber) {
    return dispatch => {
        http.fetchAll("bestPractice/byStep/" + deptName + "&" + objectiveName + "&" + stepNumber)
            .then((bestPractices) => {
                dispatch(setBestPractices(bestPractices));
            });
    }
}
//Gets all bestPractices for a specific department

export function addBestPractice(bestPractice, callback) {
    bestPractice = prepBestPracticeValues(bestPractice);
    return dispatch => {
        http.addItem("bestPractice", bestPractice)
            .then(addedBestPractice => {
                dispatch(addBestPracticeToState(addedBestPractice.data));
                callback();
            });
    }
}
//Posts new bestPractice to API

export function updateBestPractice(bestPractice, callback) {
    bestPractice = prepBestPracticeValues(bestPractice);
    return dispatch => {
        http.updateItemById("bestPractice", bestPractice, bestPractice.id)
            .then(() => {
                dispatch(updateBestPracticesInState(bestPractice));
                callback();
            });
    }
}
//Updates bestPractice in database

export function deleteBestPractice(id) {
    return dispatch => {
        http.deleteItemById("bestPractice", id)
            .then(() => {
                dispatch(deleteBestPracticeFromState(id));
            });
    }
}
//Deletes selected bestPractice

export function addBestPracticeToState(bestPractice) {
    return {
        type: BestPracticeActionTypes.ADD_BEST_PRACTICE,
        payload: bestPractice
    }
}
//Adds new bestPractice from post to state

export function setBestPractices(bestPractices) {
    return {
        type: BestPracticeActionTypes.SET_BEST_PRACTICES,
        payload: bestPractices
    }
}
//Sets all bestPractices in state

export function updateBestPracticesInState(bestPractice) {
    return {
        type: BestPracticeActionTypes.UPDATE_BEST_PRACTICES,
        payload: bestPractice
    }
}
//Updates function for bestPractice

export function deleteBestPracticeFromState(id) {
    return {
        type: BestPracticeActionTypes.DELETE_BEST_PRACTICE,
        payload: id
    }
}
//Deletes selected bestPractice

function prepBestPracticeValues(bestPractice) {
    bestPractice.practice = helper.capitalizeAll(bestPractice.practice);
    if (bestPractice.method) {
        bestPractice.method = helper.capitalize(bestPractice.method);
    }
    if (bestPractice.purpose) {
        bestPractice.purpose = helper.capitalize(bestPractice.purpose);
    }

    return bestPractice;
}