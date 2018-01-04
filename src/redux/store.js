import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { reducer as form } from 'redux-form';

import auth from '../reducers/auth';

const reducers = combineReducers({
    auth
})

const middleware = [thunk]

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
)