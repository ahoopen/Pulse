import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './app/reducers';

const configureStore = () => {
    const persistedState = {};
    const logger = createLogger();

    const store = createStore(
        reducers,
        persistedState,
        compose(applyMiddleware(
            thunk,
            logger
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    store.subscribe(() => {
        // saveState({
        //     todos: store.getState()
        // });
    });

    return store;

};

export default configureStore;
