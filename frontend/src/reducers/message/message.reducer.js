import MessageActionTypes from './message.types';

const INITIAL_STATE = {
    topMessages: [],
    messages: {},
    called: {}
}

const messageReducer = (state = INITIAL_STATE, action) => {
    let messageHold = { ...state.messages };
    let topMessageHold = [...state.topMessages]
    let lastMessage = {}
    switch (action.type) {
        case MessageActionTypes.SET_MESSAGES:
            return {
                ...state,
                messages: { ...messageHold, [action.page]: [...action.payload.data] },
                called: { ...state.called, [action.page]: true }
            };
        case MessageActionTypes.SET_TOP_MESSAGES:
            return {
                ...state,
                topMessages: action.payload.data,
                called: { ...state.called, top: true }
            };
        case MessageActionTypes.ADD_MESSAGE:
            Object.keys(messageHold).forEach(key => {
                if (messageHold[key].length === 5) {
                    messageHold[key].push(lastMessage)
                    lastMessage = messageHold[key][4];
                    messageHold[key].sort((first, second) => {
                        if (first.date < second.date) {
                            return 1
                        } else {
                            return -1
                        }
                    }).pop();
                }
            })
            topMessageHold = [action.payload, ...topMessageHold.pop()];
            return {
                ...state,
                messages: [...state.messages, action.payload],
                topMessages: topMessageHold
            };
        case MessageActionTypes.UPDATE_MESSAGES:
            if (action.page === "top") {
                topMessageHold = [action.payload, ...topMessageHold
                    .filter((value) => {
                        return value._id !== action.payload._id
                    })]
                    .sort((first, second) => {
                        if (first.date < second.date) {
                            return 1
                        } else {
                            return -1
                        }
                    })
            } else {
                messageHold[action.page] = [action.payload, ...messageHold[action.page]
                    .filter((value) => {
                        return value._id !== action.payload._id
                    })]
                    .sort((first, second) => {
                        if (first.date < second.date) {
                            return 1
                        } else {
                            return -1
                        }
                    })
            }
            return {
                ...state,
                messages: messageHold,
                topMessages: topMessageHold
            };
        case MessageActionTypes.DELETE_MESSAGE:
            if (action.page === "top") {
                topMessageHold = topMessageHold
                    .filter((value) => {
                        return value._id !== action.payload._id
                    })
            } else {
                messageHold[action.page] = messageHold[action.page]
                    .filter((value) => {
                        return value._id !== action.payload._id
                    })
            }
            return {
                ...state,
                messages: messageHold,
                topMessages: topMessageHold
            };
        case MessageActionTypes.SIGNOUT_USER:
            return {
                messages: {}
            };
        default:
            return state;
    }
}

export default messageReducer;