import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './src/container/App'
import {appReducer} from "./src/reducers/rootReducer";

ReactDom.render( <Provider store={createStore(appReducer)}><App/></Provider>,document.getElementById('chatApp'))