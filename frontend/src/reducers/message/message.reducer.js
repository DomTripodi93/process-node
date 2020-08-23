import MessageActionTypes from './message.types';

const INITIAL_STATE = {
    topMessages: [],
    messages: {},
    called: {},
    moreResults: {}
}

const messageReducer = (state = INITIAL_STATE, action) => {
    let messageHold = { ...state.messages };
    let topMessageHold = [...state.topMessages];
    let moreResultsHold = { ...state.moreResults };
    let lastMessage = {};
    switch (action.type) {
        case MessageActionTypes.SET_MESSAGES:
            if (action.payload.data.length === 5) {
                moreResultsHold[action.page] = true;
            } else {
                moreResultsHold[action.page] = false;
            }
            return {
                ...state,
                messages: { ...messageHold, [action.page]: [...action.payload.data] },
                called: { ...state.called, [action.page]: true },
                moreResults: moreResultsHold
            };
        case MessageActionTypes.SET_TOP_MESSAGES:
            return {
                ...state,
                topMessages: action.payload.data,
                called: { ...state.called, top: true }
            };
        case MessageActionTypes.ADD_MESSAGE:
            if (topMessageHold.length > 2){
                lastMessage = topMessageHold[2];
            }
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
                } else {
                    messageHold[key].push(lastMessage);
                }
            })
            topMessageHold.pop();
            topMessageHold = [action.payload.data, ...topMessageHold];
            return {
                ...state,
                messages: messageHold,
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
                topMessages: [],
                messages: {},
                called: {},
                moreResults: {}
            };
        default:
            return state;
    }
}

export default messageReducer;