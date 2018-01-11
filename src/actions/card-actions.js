// import { pokemon } from 'pokemontcgsdk';

// Action Creators

const setCards = cards => {
    return {
        type: 'GET_CARDS_SUCCESS',
        cards
    }
}

const setCard = card => {
    return {
        type: 'GET_CARD_SUCCESS',
        card
    }
}

const setSearchQuery = query => {
    return {
        type: 'ACTIVE_SEARCH',
        query
    }
}

// Aysnc Actions

export const fetchCards = (query, pageNum) => {
    if (pageNum === undefined) {
        pageNum = 1
    }

    // handle a search query if it exists
    if (query) {
        return dispatch => {
            return fetch(`http://localhost:3000/api/v1/search/${query}?page=${pageNum}`)
                .then(res => res.json())
                .then(cards => dispatch(setCards(cards)))
                .catch(error => console.log(error))
        }
    } else {
        return dispatch => {
            return fetch(`http://localhost:3000/api/v1/cards?page=${pageNum}`)
                .then(res => res.json())
                .then(cards => dispatch(setCards(cards)))
                .catch(error => console.log(error))
        }
    }

}

export const searchCards = (query) => {
    // debugger;
    return dispatch => {
        // this route does not exist yet! make before running
        return fetch(`http://localhost:3000/api/v1/search/${query}`)
            .then(res => res.json())
            .then(cards => {
                dispatch(setCards(cards))
                dispatch(setSearchQuery(query))
            })
            .catch(error => console.log(error))
    }
}

//  i think i could remove this and call this action creator from searchCards still?
// export const setSearchQuery = (query) => {
//     return dispatch => {
//         dispatch(setSearch(query))
//     }
// }