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

const setCardInCollection = bool => {
    return {
        type: 'SET_CARD_IN_COLLECTION',
        bool
    }
}

export const changeViewType = viewType => {
    return {
        type: 'SET_LIST_VIEW_TYPE',
        viewType
    }
}

export const changeSortByFilter = filter => {
    return {
        type: 'SET_SORT_BY_FILTER',
        filter
    }
}

const handleToggleFilterModal = bool => {
    return {
        type: 'TOGGLE_SHOW_FILTER_MODAL',
        bool
    }
}

const handleToggleCardModal = bool => {
    return {
        type: 'TOGGLE_SHOW_CARD_MODAL',
        bool
    }
}

const setFilterInState = filter => {
    return {
        type: 'SET_FILTER_IN_STATE',
        filter
    }
}

const setFiltersToDefault = bool => {
    return {
        type: 'RESET_FILTERS',
        bool
    }
}

const destroyCard = card => {
    return {
        type: 'REMOVE_CARD_SUCCESS',
        card
    }
}

// Aysnc Actions

export const fetchCards = (query, pageNum, sortFilter = null, filters = null) => {
    if (pageNum === undefined || pageNum === null) {
        pageNum = 1
    }

    let cardsAPI = 'https://mysterious-island-27050.herokuapp.com/api/v1/cards';

    // the link NEEDS to be like:
    // https://mysterious-island-27050.herokuapp.com/api/v1/cards?firstParam&subsequentParams
    // ? first then &

    if (query) {
        let op = '?';
        if (cardsAPI.lastIndexOf('?') > cardsAPI.lastIndexOf('&')) {
            op = '&'
        }

        cardsAPI += `${op}query_name=${query}`
    }
    
    if (sortFilter) {
        let op = '?';
        if (cardsAPI.lastIndexOf('?') > cardsAPI.lastIndexOf('&')) {
            op = '&'
        } 

        cardsAPI += `${op}sort_filter=${sortFilter}`
    }

    if (filters && filters.length > 0) {
        let op = '?';
        // if (cardsAPI.lastIndexOf('?') > cardsAPI.lastIndexOf('&')) {
        //     op = '&'
        // }

        let keywords = ["query_name", "sort_filter"]
        let length = keywords.length

        while(length--) {
            if (cardsAPI.indexOf(keywords[length])!==-1) {
                op = '&'
            }
        }

        let filterParams = filters.join(",")
        filterParams = encodeURIComponent(filterParams)

        cardsAPI += `${op}filters=${filterParams}`
    }

    // ADD &page=${pageNum} to end of cardsAPI!
    if (pageNum) {
        let op = '&';

        // this is weird, do we need this? pageNum will likely always come after sortFilters
        // so it should theoretically always start with & right? never '?'
        if (cardsAPI.lastIndexOf('?') > cardsAPI.lastIndexOf('&')) {
            // debugger;
            op = '&'
        }

        cardsAPI += `${op}page=${pageNum}`
    }

    // TODO: if we have no query, pagenum, sortfilter, or filters
    // the link should just be the original cardsAPI link with no additions
    // ? or &page=${pageNum} at the end of 'api/v1/cards' gives an error

    if (!query && !pageNum && !sortFilter && !filters) {
        cardsAPI = 'https://mysterious-island-27050.herokuapp.com/api/v1/cards'
    }

    return dispatch => {
        return fetch(cardsAPI)
            .then(res => {
                dispatch(setTotalPages(res.headers.get('Total')))
                return res.json()
            })
            .then(cards => {
                dispatch(setCards(cards))
                // If we have a query, set it, otherwise it will go back to null
                dispatch(setSearchQuery(query))
            })
            .catch(error => console.log(error))
    }
}

export const fetchCard = (cardID, token) => {
    return dispatch => {
        return fetch(`https://mysterious-island-27050.herokuapp.com/api/v1/cards/${cardID}`, {
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer: ${token}`
            }
        })
            .then(res => res.json())
            .then(card => {
                dispatch(setCard(card["card"]))
                if(card["cardInCollection"]) {
                    dispatch(setCardInCollection(true))
                } else {
                    dispatch(setCardInCollection(false))
                }
            })
            .catch(error => console.log(error))
    }
}

export const fetchCollection = (token, pageNum) => {
    if (pageNum === undefined || pageNum === null) {
        pageNum = 1
    }

    // we need to hit an API route that returns the cards from the user's collection
    // we'll need to pass the token as an Authorization header like in the fetchCard function above
    return dispatch => {
        return fetch(`https://mysterious-island-27050.herokuapp.com/api/v1/collection?page=${pageNum}`, {
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer: ${token}`
            }
        })
            .then(res => {
                dispatch(setTotalPages(res.headers.get('Total')))
                return res.json()
            })
            .then(cards => {
                // once we get the data back, dispatch to the appropriate function
                dispatch(setCards(cards))
            })
            .catch(error => console.log(error))
    }
}

export const addToCollection = (cardID, token) => {
    return dispatch => {
        return fetch(`https://mysterious-island-27050.herokuapp.com/api/v1/cards/${cardID}/add`, {
            method: 'post',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer: ${token}`
            }
        })
            .then(res => res.json())
            .then(response => {
                // we need to let the card show page know whether this card
                //   is in the current user's collection or not
                // that way the "add to collection" link can 
                //   become disabled / say "In your collection" or something
                if (response.cardInCollection === true) {
                    // rails told us the current user has this card in their collection
                    return dispatch(setCardInCollection(true))
                }
            })
            .catch(error => console.log(error))
    }
}

export const removeFromCollection = (cardID, token) => {
    return dispatch => {
        return fetch(`https://mysterious-island-27050.herokuapp.com/api/v1/cards/${cardID}`, {
            method: 'delete',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer: ${token}`
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.cardInCollection === false) {
                    return dispatch(setCardInCollection(false))
                }
                // dispatch(destroyCard(card))
                // dispatch(setCardInCollection())
            })
            .catch(error => console.log(error))
    }
}

export const toggleFilterModal = bool => {
    return dispatch => {
        return dispatch(handleToggleFilterModal(bool))
    }
}

export const toggleCardModal = bool => {
    return dispatch => {
        return dispatch(handleToggleCardModal(bool))
    }
}

export const manageFilterInState = filter => {
    return dispatch => {
        return dispatch(setFilterInState(filter))
    }
}

export const resetFilters = () => {
    return dispatch => {
        return dispatch(setFiltersToDefault(true))
    }
}

// export const changeViewType = viewType => {
//     // return dispatch => {
//     //     debugger;
//     //     return dispatch(setListViewType(viewType))
//     // }
//     debugger;
//     return dispatch = (viewType) => {
//         debugger;
//     }
// }
