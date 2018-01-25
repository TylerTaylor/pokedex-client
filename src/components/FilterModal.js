import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { manageFilterInState, resetFilters } from '../actions/card-actions';

class FilterModal extends React.Component {
    
	handleFilterChange = event => {
		// every time this function gets called
		//   we should be using redux to add this filter to our filters array (need to create this too)
		this.props.manageFilterInState(event.target.value)
	}
	
	handleFilterReset = () => {
		this.props.resetFilters()
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
						<p>By set:</p>
						<div className="set-filters-container">
							{/* iterate through filtersList and create checkbox for each filter */}
							{this.props.filtersList.map((filter, index) => 
								<Row>
										<Input key={index} checked={this.shouldBeChecked(filter)} type='checkbox' value={filter} label={filter}/>
								</Row>
							)}
						</div>

						<div className="button-group">
							<Button onClick={this.handleFilterReset}>Reset</Button>
							<Button type='submit' value='submit'>Apply</Button>
						</div>
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

export default connect(mapStateToProps, { manageFilterInState, resetFilters })(FilterModal);