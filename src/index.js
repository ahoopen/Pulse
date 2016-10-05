import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './configureStore';
import Root from './root';

const store = configureStore();

injectTapEventPlugin();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);
