const initialState = {
    cards: null,
    totalPages: null,
    viewType: "grid"
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
        default:
            return state;
    }
}