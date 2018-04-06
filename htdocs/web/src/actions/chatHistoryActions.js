import {
    ADD_HISTORY, ADD_MESSAGE, ADD_TYPING_USER, ADD_USER, REMOVE_TYPING_USER, REMOVE_USER,
    SET_USER_ID
} from "../app/constants";

export function addHistory(messages, timeStamp){
    return {
        type : ADD_HISTORY,
        payload : {
            messages,
            timeStamp
        }
    }
}

export function setUserId(userId){
    return {
        type : SET_USER_ID,
        payload : userId
    }
}

export function addMessage(message){
    return {
        type    : ADD_MESSAGE,
        payload : message
    }
}

export function addUser(UUId){
    return {
        type    : ADD_USER,
        payload : UUId
    }
}

export function removeUser(UUId){
    return {
        type    : REMOVE_USER,
        payload : UUId
    }
}

export function addTyingUser(UUId){
    return {
        type    : ADD_TYPING_USER,
        payload : UUId
    }
}

export function removeTypingUser(UUId){
    return {
        type    : REMOVE_TYPING_USER,
        payload : UUId
    }
}