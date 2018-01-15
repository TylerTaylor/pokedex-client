export default (state = {}, action) => {
    switch(action.type) {
        case 'GET_CARD_SUCCESS':
            return action.card;
        default:
            return state;
    }
}