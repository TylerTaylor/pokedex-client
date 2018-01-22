import React, { Component } from 'react';
import { connect } from 'react-redux';

// import CardsList from somewhere
import CardsList from '../components/CardsList';
// import action to fetch cards
import { 
    fetchCards, 
    changeViewType, 
    changeSortByFilter, 
    toggleFilterModal,
    fetchCardsFiltered
} from '../actions/card-actions';
import Search from '../components/Search';
import FilterModal from '../components/FilterModal';
import { Icon, Button, Dropdown, NavItem, Input, Row } from 'react-materialize';
import '../styles/cards.css';

class CardsIndex extends Component {

    constructor() {
        super()

        this.updateCards = this.updateCards.bind(this)
    }

    componentDidMount() {
        this.props.fetchCards(null, null, this.props.sortBy)
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
        // call a redux action to set our 'showFilterModal' property to true
        this.props.toggleFilterModal(this.props.showFilterModal)
    }
    
    render() {
        return (
            <div className="cards-index-container">

                <div className="search-container">
                    <Search />

                    {/* Should I move this to its own component? */}
                    <div className="filter-container">
                        <Dropdown trigger={
                            <Button>{ this.props.sortBy }</Button>
                        }>
                            <NavItem value="Name A-Z" onClick={this.handleSortFilterChange}>Name A-Z</NavItem>
                            <NavItem divider />
                            <NavItem value="Name Z-A" onClick={this.handleSortFilterChange}>Name Z-A</NavItem>
                            <NavItem divider />
                            <NavItem value="Number ASC" onClick={this.handleSortFilterChange}>Number(lowest)</NavItem>
                            <NavItem divider />
                            <NavItem value="Number DESC" onClick={this.handleSortFilterChange}>Number(highest)</NavItem>
                            <NavItem divider />
                            <NavItem value="Set A-Z" onClick={this.handleSortFilterChange}>Set A-Z</NavItem>
                            <NavItem divider />
                            <NavItem value="Set Z-A" onClick={this.handleSortFilterChange}>Set Z-A</NavItem>
                            <NavItem divider />
                            <NavItem value="Series A-Z" onClick={this.handleSortFilterChange}>Series A-Z</NavItem>
                            <NavItem divider />
                            <NavItem value="Series Z-A" onClick={this.handleSortFilterChange}>Series Z-A</NavItem>
                            <NavItem divider />
                            <NavItem value="Set Newest" onClick={this.handleSortFilterChange}>Set(newest)</NavItem>
                            <NavItem divider />
                            <NavItem value="Set Oldest" onClick={this.handleSortFilterChange}>Set(oldest)</NavItem>
                            <NavItem divider />
                            <NavItem value="Series Newest" onClick={this.handleSortFilterChange}>Series(newest)</NavItem>
                            <NavItem divider />
                            <NavItem value="Series Oldest" onClick={this.handleSortFilterChange}>Series(oldest)</NavItem>
                        </Dropdown>

                        <Button onClick={this.handleFilterModal}>Filters</Button>

                        {/* Show our FilterModal here */}
                        <FilterModal show={this.props.showFilterModal} onClose={this.handleFilterModal} updateFilters={this.updateCards}>
                            <h3>Filters</h3>
                        </FilterModal>
                    </div>



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
    toggleFilterModal,
    fetchCardsFiltered
})(CardsIndex);