const initialState = {
    query: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'ACTIVE_SEARCH':
            // debugger;
            return {
                ...state,
                query: action.query
            }
        default:
            return state;
    }
}