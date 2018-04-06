import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {BrowserRouter as Router , Route , Link } from 'react-router-dom'
import {baseContainer,chatAppContainer,calcContainer,weatherAppContainer} from "./loadableConfigs"

export const configureRouteForStore = (store) => {
    return (<Provider store={store}>
        <Router>
            <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/chatApp">ChatApp</Link></li>
                <li><Link to="/calculator">Calculator</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/weatherApp">Weather App</Link></li>
            </ul>
            <hr/>
            <Route exact path="/" component={baseContainer}/>
            <Route path="/chatApp" component={chatAppContainer}/>
            <Route path="/calculator" component={calcContainer}/>
             <Route path="/weatherApp" component={weatherAppContainer}/>
            </div>
        </Router>
    </Provider>)
}