import I from 'immutable'
import chatHistoryReducer from "./chatHistoryReducer";
export default function reducers(state=I.fromJS({}),action={}) {
    state = processReducer('chatHistory',chatHistoryReducer,state,action)
    return state
}

function processReducer(component,reducer,state,action){
   const componentState = state.get(component,undefined)
    const newComponentState =  reducer(componentState,action)
    if(!I.is(componentState,newComponentState)){
       state = state.set(component,newComponentState)
    }
    return state
}