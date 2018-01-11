import React from 'react';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';
import { fetchCards } from '../actions/card-actions';

class Search extends React.Component {
    
    constructor() {
        super()

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(event) {
        let query = event.target.value
        // debugger;
        // if query >= 3 then run a search
        if (query.length >= 3) {
            this.props.fetchCards(query, null)
        } else {
            // if user deletes some keys or clears the search field
            //   reset it to the original query
            //     should i store the original query somewhere or just another request? 
            // feels like this sends too many requests
            this.props.fetchCards(null, null)
        }
        



    }
    
    render() {
        return (
            <div>
                <Row>
                    <Input onChange={this.handleInput} placeholder="Search"/>
                </Row>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return ({
        cards: state.cards
    })
}

export default connect(mapStateToProps, { fetchCards })(Search);