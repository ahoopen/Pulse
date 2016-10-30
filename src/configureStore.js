import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import  { loadState, saveState } from './loadState';
import reducers from './app/reducers';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const configureStore = () => {
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

    store.subscribe(throttle(() => {
        saveState({
            user: store.getState().user
        });
    }, 1000));

    return store;

};

export default configureStore;
