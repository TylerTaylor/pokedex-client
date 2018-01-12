const initialState = {
    cards: null,
    totalPages: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_CARDS_SUCCESS':
            // let cards = action.cards
            // return cards;
            return {
                ...state,
                cards: action.cards
            }
        case 'SET_TOTAL_PAGES':
            // let totalPages = action.totalPages
            // debugger;
            // return totalPages;
            let items = action.totalPages
            let totalPages = Math.ceil(items / 10) * 10;

            return {
                ...state,
                totalPages: totalPages
            }
        default:
            return state;
    }
}