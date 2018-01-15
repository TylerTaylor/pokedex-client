import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCard, addToCollection } from '../actions/card-actions';
import { Card } from '../components/Card';

class CardShow extends Component {

    componentDidMount() {
        // call fetchCard here
        this.props.fetchCard(this.props.match.params.id)
    }

    handleAddCard = () => {
        let id = this.props.match.params.id;
        debugger;
        this.props.addToCollection(id);
    }

    render() {
        const { card } = this.props;

        if (!card.errors) {
            return (
                <div className="card-flex-container">
                    <Card card={ card } add={this.handleAddCard}/>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Card Not Found</h1>
                </div>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return ({
        card: state.card
    })
}

export default connect(mapStateToProps, { fetchCard, addToCollection })(CardShow);