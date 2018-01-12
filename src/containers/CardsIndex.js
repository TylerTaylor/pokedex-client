import React, { Component } from 'react';
import { connect } from 'react-redux';

// import CardsList from somewhere
import CardsList from '../components/CardsList';
// import action to fetch cards
import { fetchCards } from '../actions/card-actions';

import Search from '../components/Search';

class CardsIndex extends Component {

    constructor() {
        super()

        this.updateCards = this.updateCards.bind(this)
    }

    componentDidMount() {
        this.props.fetchCards()
    }

    // for pagination. sends query to /api/cards with page number
    updateCards(pageNum) {
        // handle pagination with a search term and without
        if (this.props.query) {
            this.props.fetchCards(this.props.query, pageNum)
        } else {
            // don't pass a query and it will just paginate normally
            this.props.fetchCards(null, pageNum)
        }
    }

    handleSearch = (event) => {
        debugger;
    }

    render() {
        return (
            <div>
                <Search />
                <CardsList cards={ this.props.cards } updateCards={ this.updateCards } />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return ({
        cards: state.cards,
        query: state.search.query,
        totalPages: state.totalPages
    })
}

export default connect(mapStateToProps, { fetchCards })(CardsIndex);
// export default CardsIndex;