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

const setTotalPages = totalPages => {
    return {
        type: 'SET_TOTAL_PAGES',
        totalPages
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
                .then(res => {
                    // we need to set our total page number here
                    dispatch(setTotalPages(res.headers.get('Total')))
                    return res.json()
                })
                .then(cards => {
                    dispatch(setCards(cards))
                    dispatch(setSearchQuery(query))
                    // debugger;
                })
                .catch(error => console.log(error))
        }
    } else {
        return dispatch => {
            return fetch(`http://localhost:3000/api/v1/cards?page=${pageNum}`)
                .then(res => {
                    // we also need to set totalPages here
                    dispatch(setTotalPages(res.headers.get('Total')))
                    return res.json()
                })
                .then(cards => {
                    dispatch(setCards(cards))
                    dispatch(setSearchQuery(null))
                })
                .catch(error => console.log(error))
        }
    }

}

export const fetchCard = cardID => {
    return dispatch => {
        return fetch(`http://localhost:3000/api/v1/cards/${cardID}`)
            .then(res => res.json())
            .then(card => dispatch(setCard(card)))
            .catch(error => console.log(error))
    }
}

export const addToCollection = cardID => {
    return dispatch => {
        return fetch(`http://localhost:3000/api/v1/cards/${cardID}/add`, {
            method: 'post',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
            .then(res => res.json())
            .then(response => {
                debugger;
            })
            .catch(error => console.log(error))
    }
}

// can i delete this? think so
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