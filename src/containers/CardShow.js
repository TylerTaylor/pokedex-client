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
        let token = this.props.token;

        if (token) {
            this.props.addToCollection(id, token);
        } else {
            this.props.history.push("/login")
            // how do we redirect from here?
        }
    }

    render() {
        const { card } = this.props;

        if (!card.errors) {
            return (
                <div className="card-flex-container">
                    <Card card={ card } inCollection={this.props.inCollection} add={this.handleAddCard}/>
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
    console.log("Logging CardShow state...")
    console.log(state)
    return ({
        card: state.card.card,
        inCollection: state.card.inCollection,
        token: state.auth.token
    })
}

export default connect(mapStateToProps, { fetchCard, addToCollection })(CardShow);