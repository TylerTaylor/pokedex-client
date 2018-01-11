export default (state = [], action) => {
    switch(action.type) {
        case 'GET_CARDS_SUCCESS':
            let cards = action.cards
            return cards;
        default:
            return state;
    }
}