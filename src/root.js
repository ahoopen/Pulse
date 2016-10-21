import React from 'react';
import {Provider} from 'react-redux';
import {browserHistory, Router, Route, IndexRoute} from 'react-router'

import App from './app/App';
import Login from './app/page/login';
import RegisterFlow from './app/containers/registration/registration';
import Dashboard from './app/page/dashboard';
import requireAuthentication from './app/components/authentication';

const test = React.createClass({
    render() {
        return <div>Welcome to the app!</div>
    }
});



const Root = ({store}) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={test}/>
                <Route path='register' component={RegisterFlow}/>
                <Route path='login' component={Login}/>
                <Route path='dashboard' component={requireAuthentication(Dashboard)}/>
            </Route>
        </Router>
    </Provider>
);

export default Root;
