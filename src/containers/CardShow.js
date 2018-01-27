import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCard, addToCollection, removeFromCollection, toggleCardModal } from '../actions/card-actions';
import { Card } from '../components/Card';

class CardShow extends Component {

    componentDidMount() {
        // call fetchCard here
        let id = this.props.match.params.id;
        let token = this.props.token;
        // debugger;
        this.props.fetchCard(id, token)
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

    handleRemoveCard = () => {
        let id = this.props.match.params.id;
        let token = this.props.token;

        // user really shouldn't have the option to remove card without being logged in
        // but just in case...
        if (token) {
            this.props.removeFromCollection(id, token);
        } else {
            this.props.history.push("/login")
        }
    }

    handleShowModal = () => {
        this.props.toggleCardModal(this.props.showCardModal)
    }

    render() {
        const { card } = this.props;

        if (!card.errors) {
            return (
                <div className="card-flex-container">
                    <Card card={ card } 
                          inCollection={this.props.inCollection} 
                          add={this.handleAddCard} 
                          remove={this.handleRemoveCard}
                          show={this.props.showCardModal} 
                          showModal={this.handleShowModal}
                    />
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
        showCardModal: state.card.showCardModal,
        inCollection: state.card.inCollection,
        token: state.auth.token
    })
}

export default connect(mapStateToProps, { fetchCard, addToCollection, removeFromCollection, toggleCardModal })(CardShow);