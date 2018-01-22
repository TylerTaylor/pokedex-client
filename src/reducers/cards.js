const initialState = {
    cards: null,
    totalPages: null,
    viewType: "grid",
    sortBy: "Name A-Z",
    showFilterModal: false,
    filters: []
}

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
            return {
                ...state,
                filters: [...state.filters, action.filter]
            }
        default:
            return state;
    }
}