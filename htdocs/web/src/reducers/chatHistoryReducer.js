import I from 'immutable'
import {
    ADD_HISTORY, ADD_MESSAGE, ADD_TYPING_USER, ADD_USER, REMOVE_TYPING_USER, REMOVE_USER,
    SET_USER_ID
} from "../app/constants";
const InitialState = I.fromJS({
    userId : 0,
    messages : [],
    users : [],
    lastMsgTimeStamp: null,
    typingUsers : [],
})

export default function chatHistoryReducer(state=InitialState,action={}) {
    switch (action.type){
        case ADD_HISTORY :
            state = state.update('messages',(messages) => messages.unshift(...action.payload.messages))
            state = state.set('lastMsgTimeStamp',action.payload.timeStamp)
            return state
        case ADD_MESSAGE :
            return state.update('messages',(messages) => messages.concat(action.payload))
        case SET_USER_ID :
            return state.set('userId',action.payload)
        case ADD_USER :
            return state.update('users',(users) => users.indexOf(action.payload) > 0 ? users
                : users.concat(action.payload))
        case REMOVE_USER :
            return state.update('users',(users) => users.filter((user) => user !== action.payload))
        case ADD_TYPING_USER :
            return state.update('typingUsers',(users) => users.indexOf(action.payload)>0 ||
            action.payload === state.get('userId')? users : users.concat(action.payload))
        case REMOVE_TYPING_USER :
            return state.update('typingUsers',(users) => users.filter((userId)=> userId !==action.payload))
        default :
            return state
    }
}