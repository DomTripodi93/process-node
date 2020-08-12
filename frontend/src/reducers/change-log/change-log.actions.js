import rootHttp from '../root-http';
import ChangeLogActionTypes from './change-log.types';


const http = new rootHttp();

export function fetchChanges(model, page) {
    return dispatch => {
        http.fetchAll("changeLog/"+ model + "&" + page)
            .then((changes) => {
                dispatch(setChanges(changes, model, page));
            });
    }
}
//Gets all changes for a specific department

export function setChanges(changes, model, page) {
    return {
        type: ChangeLogActionTypes.SET_CHANGES,
        payload: changes,
        model,
        page
    }
}
//Sets all changes in state