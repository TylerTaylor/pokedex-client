import React, { Component } from 'react';
import { connect } from 'react-redux';

// import CardsList from somewhere
import CardsList from '../components/CardsList';
// import action to fetch cards
import { fetchCards, changeViewType } from '../actions/card-actions';
import Search from '../components/Search';
import { Icon, Button } from 'react-materialize';
import '../styles/cards.css';

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
            <div className="cards-index-container">
                {/* we need a row above the cardslist that contains
                    our search component, and buttons for view options (list, grid)
                    then we can add any sort / filter options on the right
                */}
                <div className="search-container">
                    <Search />
                    {/* // TODO: We need a filter function
                    //   hook this function up to a button / menu
                    //     when button / menu is clicked or selected
                    //       call this function and hit the backend with the appropriate query */}

                    <div className="view-icon-container">
                        <Button waves='light' onClick={() => this.props.changeViewType("list") }><Icon large>view_list</Icon></Button>
                        <Button waves='light' onClick={() => this.props.changeViewType("grid") }><Icon large>view_comfy</Icon></Button>
                    </div>
                </div>

                <CardsList cards={ this.props.cards } updateCards={ this.updateCards } />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return ({
        cards: state.cards,
        query: state.search.query,
        totalPages: state.totalPages,
        viewType: state.cards.viewType
    })
}

export default connect(mapStateToProps, { fetchCards, changeViewType })(CardsIndex);
// export default CardsIndex;