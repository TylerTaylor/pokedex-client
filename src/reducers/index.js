import { combineReducers } from 'redux';
// Import each reducer here

// combine all your reducers here to export one object
const allReducers = combineReducers({
    user: AuthReducer // needs to be created!
})