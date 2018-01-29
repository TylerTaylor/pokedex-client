import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardsList from '../components/CardsList';
import { Redirect } from 'react-router-dom';

import { fetchCollection } from '../actions/card-actions';

class Collection extends Component {

    constructor() {
        super()

        this.updateCards = this.updateCards.bind(this)
    }

    componentDidMount() {
        // Send request to API for user's collection
        let token = this.props.token

        if (token) {
            this.props.fetchCollection(token)
        }
    }

    // this is the same as in CardsIndex.js - how can i use it without repeating myself?
    updateCards(pageNum) {
        // we don't HAVE a query or sort or filter here so change this up
        // this.props.fetchCards(this.props.query, pageNum, this.props.sortBy, this.props.cards.filters)

        // should be able to call this.props.fetchCollection() and pass in a page number
        let token = this.props.token

        if (token) {
            this.props.fetchCollection(token, pageNum)
        }
    }

    render() {

        if (!localStorage.getItem('token')) {
            return <Redirect to="/login" />
        } else {
            return (
                <div className="cards-index-container">
                    <div className="center">
                        <h2>Your Collection</h2>
                        <small>Filters coming soon</small>
                        <br />
                    </div>
                    <CardsList cards={ this.props.cards } updateCards={ this.updateCards }/>
                </div>
            )
        }
        
    }

}

const mapStateToProps = (state) => {
    return ({
        token: state.auth.token,
        cards: state.cards,
        query: state.search.query,
        sortBy: state.cards.sortBy
    })
}

export default connect(mapStateToProps, { fetchCollection })(Collection);