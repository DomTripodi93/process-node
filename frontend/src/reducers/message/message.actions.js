import rootHttp from '../root-http';
import MessageActionTypes from './message.types';


const http = new rootHttp();


export function fetchMessages() {
    return dispatch => {
        http.fetchAll("message")
            .then((messages) => {
                dispatch(setTopMessages(messages));
            });
    }
}
//Gets all changes for a specific department

export function fetchNextMessages(page, callback) {
    return dispatch => {
        http.fetchAll("message/next/" + page)
            .then((messages) => {
                dispatch(setMessages(messages, page));
                callback();
            });
    }
}
//Gets all changes for a specific department

export function addMessage(message, callback) {
    return dispatch => {
        http.addItem("message", message)
            .then((messageReturned) => {
                dispatch(addMessageToState(messageReturned));
                callback();
            });
    }
}
//Posts new bestPractice to API

export function updateMessage(message, page, callback) {
    return dispatch => {
        http.updateItemById("message", message, message._id)
            .then((messageReturned) => {
                dispatch(updateMessageInState(messageReturned, page));
                callback();
            });
    }
}
//Posts new bestPractice to API

export function deleteMessage(id, page) {
    return dispatch => {
        http.deleteItemById("message", id)
            .then(() => {
                dispatch(deleteMessageInState(id, page));
            });
    }
}
//Posts new bestPractice to API

export function setMessages(messages, page) {
    return {
        type: MessageActionTypes.SET_MESSAGES,
        payload: messages,
        page
    }
}
//Sets all changes in state

export function setTopMessages(messages) {
    return {
        type: MessageActionTypes.SET_TOP_MESSAGES,
        payload: messages
    }
}
//Sets all changes in state

export function addMessageToState(message) {
    return {
        type: MessageActionTypes.ADD_MESSAGE,
        payload: message
    }
}
//Sets all changes in state

export function updateMessageInState(message, page) {
    return {
        type: MessageActionTypes.UPDATE_MESSAGES,
        payload: message,
        page
    }
}
//Sets all changes in state

export function deleteMessageInState(id, page) {
    return {
        type: MessageActionTypes.DELETE_MESSAGE,
        payload: id,
        page
    }
}
//Sets all changes in state