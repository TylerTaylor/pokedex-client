import React, { Component } from 'react';
import { connect } from 'react-redux';

// import CardsList from somewhere
import CardsList from '../components/CardsList';
// import action to fetch cards
import { 
    fetchCards, 
    changeViewType, 
    changeSortByFilter, 
    toggleFilterModal
} from '../actions/card-actions';
import Search from '../components/Search';
// import FilterModal from '../components/FilterModal';
import { Filters } from '../components/Filters';
import { Icon, Button } from 'react-materialize';
import '../styles/cards.css';

class CardsIndex extends Component {

    constructor() {
        super()

        this.updateCards = this.updateCards.bind(this)
    }

    componentDidMount() {
        // TODO: can we do something with the pageNum here?
        //   when on a later page (ie page 3) and you click a card, then go back, it resets to page 1
        this.updateCards()
    }

    updateCards(pageNum) {
        this.props.fetchCards(this.props.query, pageNum, this.props.sortBy, this.props.cards.filters)
    }

    handleSortFilterChange = (event) => {
        event.preventDefault();
        let filter = event.target.text;

        // we need to tell our reducer about our new sortBy value
        this.props.changeSortByFilter(filter)
        // as well as fetch the cards with the proper filtering
        this.props.fetchCards(null, null, filter, this.props.cards.filters)
    }

    handleFilterModal = () => {
        // call a redux action to set our 'showFilterModal' property to true or false
        this.props.toggleFilterModal(this.props.showFilterModal)
    }
    
    render() {
        return (
            <div className="cards-index-container">

                <div className="search-container">
                    <Search />

                    {/* it needs to pass through this.handleSortFilterChange to handle onClick */}                
                    <Filters sortBy={this.props.sortBy} updateSortFilters={this.handleSortFilterChange} show={this.props.showFilterModal} onClick={this.handleFilterModal} onClose={this.handleFilterModal} updateFilters={this.updateCards}/>

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
        viewType: state.cards.viewType,
        sortBy: state.cards.sortBy,
        showFilterModal: state.cards.showFilterModal
    })
}

export default connect(mapStateToProps, { 
    fetchCards, 
    changeViewType, 
    changeSortByFilter,
    toggleFilterModal
})(CardsIndex);