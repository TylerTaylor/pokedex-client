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

const setFilterInState = filter => {
    return {
        type: 'SET_FILTER_IN_STATE',
        filter
    }
}

// Aysnc Actions

export const fetchCards = (query, pageNum, sortFilter = null, filters = null) => {
    if (pageNum === undefined || pageNum === null) {
        pageNum = 1
    }

    let cardsAPI = 'http://localhost:3000/api/v1/cards';

    // the link NEEDS to be like:
    // http://localhost:3000/api/v1/cards?firstParam&subsequentParams
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
        if (cardsAPI.lastIndexOf('?') > cardsAPI.lastIndexOf('&')) {
            op = '&'
        }
        
        let filterParams = filters.join(",")
        filterParams = encodeURIComponent(filterParams)
        // debugger;
        cardsAPI += `${op}filters=${filterParams}`
        // Why does this old way work? why do filters come in as a string like "Crimson Invasion, Sun & Moon"?
        //   while the new attempt (line 114) breaks it up on the &?
        // cardsAPI = `http://localhost:3000/api/v1/cards/filter/${filters}?page=${pageNum}`
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

    // cardsAPI += `&page=${pageNum}`

    // TODO: if we have no query, pagenum, sortfilter, or filters
    // the link should just be the original cardsAPI link with no additions
    // ? or &page=${pageNum} at the end of 'api/v1/cards' gives an error

    if (!query && !pageNum && !sortFilter && !filters) {
        cardsAPI = 'http://localhost:3000/api/v1/cards'
    }

    return dispatch => {
        return fetch(cardsAPI)
            .then(res => {
                dispatch(setTotalPages(res.headers.get('Total')))
                return res.json()
            })
            .then(cards => {
                dispatch(setCards(cards))
                if (query) {
                    dispatch(setSearchQuery(query))
                }
            })
            .catch(error => console.log(error))
    }

    // TODO: there has to be a cleaner way to do this

    // handle a search query if it exists
    // if (sortFilter) {
    //     return dispatch => {
    //         return fetch(`http://localhost:3000/api/v1/cards/filter/${sortFilter}?page=${pageNum}`)
    //             .then(res => {
    //                 dispatch(setTotalPages(res.headers.get('Total')))
    //                 return res.json()
    //             })
    //             .then(cards => {
    //                 dispatch(setCards(cards))
    //             })
    //             .catch(error => console.log(error))
    //     }
    // } 
    // else if (filters.length > 0) {
    //     return dispatch => {
    //         return fetch(`http://localhost:3000/api/v1/cards/filter/${filters}?page=${pageNum}`)
    //             .then(res => {
    //                 dispatch(setTotalPages(res.headers.get('Total')))
    //                 return res.json()
    //             })
    //             .then(cards => {
    //                 dispatch(setCards(cards))
    //             })
    //             .catch(error => console.log(error))
    //     }
    // } 
    // else if (query) {
    //     return dispatch => {
    //         return fetch(`http://localhost:3000/api/v1/search/${query}?page=${pageNum}`)
    //             .then(res => {
    //                 // we need to set our total page number here
    //                 dispatch(setTotalPages(res.headers.get('Total')))
    //                 return res.json()
    //             })
    //             .then(cards => {
    //                 dispatch(setCards(cards))
    //                 dispatch(setSearchQuery(query))
    //                 // debugger;
    //             })
    //             .catch(error => console.log(error))
    //     }
    // } else {
    //     return dispatch => {
    //         return fetch(`http://localhost:3000/api/v1/cards?page=${pageNum}`)
    //             .then(res => {
    //                 // we also need to set totalPages here
    //                 dispatch(setTotalPages(res.headers.get('Total')))
    //                 return res.json()
    //             })
    //             .then(cards => {
    //                 dispatch(setCards(cards))
    //                 dispatch(setSearchQuery(null))
    //             })
    //             .catch(error => console.log(error))
    //     }
    // }

}

export const fetchCard = cardID => {
    return dispatch => {
        return fetch(`http://localhost:3000/api/v1/cards/${cardID}`)
            .then(res => res.json())
            .then(card => dispatch(setCard(card)))
            .catch(error => console.log(error))
    }
}

export const addToCollection = (cardID, token) => {
    return dispatch => {
        return fetch(`http://localhost:3000/api/v1/cards/${cardID}/add`, {
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
                    debugger;
                    return dispatch(setCardInCollection(true))
                }
            })
            .catch(error => console.log(error))
    }
}

export const toggleFilterModal = bool => {
    return dispatch => {
        return dispatch(handleToggleFilterModal(bool))
    }
}

export const addFilterToState = filter => {
    return dispatch => {
        return dispatch(setFilterInState(filter))
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
