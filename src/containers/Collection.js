import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardsList from '../components/CardsList';
import { Redirect } from 'react-router-dom';

import { fetchCollection } from '../actions/card-actions';

class Collection extends Component {

    componentDidMount() {
        // Send request to API for user's collection
        let token = this.props.token

        if (token) {
            this.props.fetchCollection(token)
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
                    <CardsList cards={ this.props.cards } />
                </div>
            )
        }
        
    }

}

const mapStateToProps = (state) => {
    return ({
        token: state.auth.token,
        cards: state.cards
    })
}

export default connect(mapStateToProps, { fetchCollection })(Collection);