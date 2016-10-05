import React from 'react';
import { Provider } from 'react-redux';
import {browserHistory, Router, Route, IndexRoute} from 'react-router'

import App from './app/App';
import Login from './app/page/login';
import Register from './app/page/register';

const Dashboard = React.createClass({
    render() {
        return <div>Welcome to the app!</div>
    }
});

const Root = ({ store }) => (
  <Provider store={store}>
      <Router history={browserHistory}>
          <Route path='/' component={App}>
              <IndexRoute component={Dashboard}/>
              <Route path='register' component={Register}/>
              <Route path='login' component={Login}/>
          </Route>
      </Router>
  </Provider>
);

export default Root;
