import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './app/reducers';
import App from './app/App';

import {browserHistory, Router, Route, IndexRoute} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import Login from './app/page/login';
import Register from './app/page/register';

const Dashboard = React.createClass({
    render() {
        return <div>Welcome to the app!</div>
    }
});

injectTapEventPlugin();

const logger = createLogger();


// , initialState, compose(
//     applyMiddleware(...middleware),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// ))

const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(
        thunk,
        logger
    ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Dashboard}/>
                <Route path='register' component={Register}/>
                <Route path='login' component={Login}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
