import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { reducer as form } from 'redux-form';

import auth from '../reducers/auth';
import card from '../reducers/card';
import cards from '../reducers/cards';
import search from '../reducers/search';

const reducers = combineReducers({
    auth,
    card,
    cards,
    search
})

const middleware = [thunk]

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
)