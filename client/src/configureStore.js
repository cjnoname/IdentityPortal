import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { routerMiddleware, push } from 'react-router-redux';
import { browserHistory } from 'react-router'

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const reduxRouterMiddleware = routerMiddleware(browserHistory);

    return {
        ...createStore(rootReducer,
        applyMiddleware(sagaMiddleware, reduxRouterMiddleware)),
        runSaga: sagaMiddleware.run(rootSaga)
    };
};

export default configureStore;