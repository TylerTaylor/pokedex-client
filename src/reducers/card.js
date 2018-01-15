const initialState = {
    card: {},
    inCollection: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_CARD_SUCCESS':
            return {
                ...state,
                card: action.card
            }
        case 'SET_CARD_IN_COLLECTION':
            return {
                ...state,
                inCollection: true
            }
        default:
            return state;
    }
}