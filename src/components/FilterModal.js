import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { addFilterToState } from '../actions/card-actions';

class FilterModal extends React.Component {
    
	handleFilterChange = event => {
		// every time this function gets called
		//   we should be using redux to add this filter to our filters array (need to create this too)
		this.props.addFilterToState(event.target.value)
	}

	updateFilters = () => {
		// tell redux to query our DB with the filters we have selected and added to state with handleFilterChange()
	}

	shouldBeChecked = name => {
		if (this.props.filters.indexOf(name) > -1) {
			return true
		} else {
			return false
		}
	}

	render() {
		// Render nothing if the "show" prop is false
		if (!this.props.show) {
			return null;
		}

		const backdropStyle = {
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: 'rgba(0,0,0,0.3)',
			padding: 50,
			zIndex: 100
		}

		const modalStyle = {
			backgroundColor: '#fff',
			borderRadius: 5,
			maxWidth: 500,
			minHeight: 300,
			margin: '0 auto',
			padding: 30,
			zIndex: 101
		}

		return (
			<div className="modal-backdrop" style={backdropStyle}>
				<div className="modal-display" style={modalStyle}>
					{this.props.children}            

					<form 
						onSubmit={(event) => {this.props.onClose(); this.props.updateFilters()}}
						onChange={event => this.handleFilterChange(event)}
					>
						<Row>
							<Input type='checkbox' checked={this.shouldBeChecked('Ancient Origins')} value='Ancient Origins' ref='Ancient Origins' label='Ancient Origins' />
							<Input type='checkbox' value='Sun & Moon' ref='Sun & Moon' label='Sun & Moon' />
							<Input type='checkbox' value='Roaring Skies' ref='Roaring Skies' label='Roaring Skies' />
							<Input type='checkbox' value='Crimson Invasion' ref='Crimson Invasion' label='Crimson Invasion' />
						</Row>

						<Button type='submit' value='submit'>Apply</Button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return ({
		filters: state.cards.filters
	})
}

export default connect(mapStateToProps, { addFilterToState })(FilterModal);