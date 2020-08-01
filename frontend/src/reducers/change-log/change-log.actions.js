import rootHttp from '../../root-http';
import ChangeLogActionTypes from './change-log.types';


const http = new rootHttp();

export function fetchChanges(model) {
    return dispatch => {
        http.fetchAll("changeLog/"+ model)
            .then((changes) => {
                dispatch(setChanges(changes, model));
            });
    }
}
//Gets all changes for a specific department

export function setChanges(changes, model) {
    return {
        type: ChangeLogActionTypes.SET_CHANGES,
        payload: changes,
        model
    }
}
//Sets all changes in state