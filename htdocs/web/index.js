import React from 'react'
import ReactDom from 'react-dom'
import {appReducer} from "./src/reducers/rootReducer";
import {createStore} from 'redux'
import {configureRouteForStore} from './src/configs/routeConfig'
window.React = React
let store = createStore(appReducer)
let routeConfig = configureRouteForStore(store)
ReactDom.render( routeConfig,document.getElementById('myContainer'))