import Loadable from 'react-loadable'
const LOADING = () => <div>Loading...</div>

export const chatAppContainer = Loadable({
    loader  : () => import("../container/ChatAppContainer"),
    loading : () => LOADING()
})

export const baseContainer = Loadable({
    loader: () => import("../container/BaseContainer"),
    loading : () => LOADING()
})

export const calcContainer = Loadable({
    loader : () => import("../container/CalcContainer"),
    loading : () => LOADING()
})

export const weatherAppContainer = Loadable({
    loader : () => import("../container/WeatherAppContainer"),
    loading : () => LOADING()
})