const initialState = {
    cards: null,
    totalPages: null,
    viewType: "grid",
    sortBy: "Name A-Z",
    showFilterModal: false,
    filters: []
}

// manageFilter = (stateFilters, filter) => {

// }

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_CARDS_SUCCESS':
            return {
                ...state,
                cards: action.cards
            }
        case 'SET_TOTAL_PAGES':
            let items = action.totalPages
            let totalPages = Math.ceil(items / 10) * 10;

            return {
                ...state,
                totalPages: totalPages
            }
        case 'SET_LIST_VIEW_TYPE':
            return {
                ...state,
                viewType: action.viewType
            }
        case 'SET_SORT_BY_FILTER':
            return {
                ...state,
                sortBy: action.filter
            }
        case 'TOGGLE_SHOW_FILTER_MODAL':
            return {
                ...state,
                showFilterModal: !action.bool
            }
        case 'SET_FILTER_IN_STATE':
            if (state.filters.indexOf(action.filter) > -1) {
                // we have the filter already, remove it
                return {
                    ...state,
                    filters: state.filters.filter(x => action.filter !== x)
                }
            } else {
                // we don't have this filter in state, so add it
                return {
                    ...state,
                    filters: [...state.filters, action.filter]
                }
            }
        case 'RESET_FILTERS':
            return {
                ...state,
                filters: []
            }
        default:
            return state;
    }
}