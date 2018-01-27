const initialState = {
    card: {},
    inCollection: false,
    showCardModal: false
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
                inCollection: action.bool
            }
        case 'REMOVE_CARD_SUCCESS':
            return {
                ...state,
                card: action.card
            }
        case 'TOGGLE_SHOW_CARD_MODAL':
            return {
                ...state,
                showCardModal: !action.bool
            }
        default:
            return state;
    }
}