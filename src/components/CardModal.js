import React from 'react';

class CardModal extends React.Component {
    render() {
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
			maxWidth: 520,
            minHeight: 300,
			margin: '0 auto',
			padding: 30,
            zIndex: 101,
            display: 'flex'
        }
        
        const imgStyle = {
            maxHeight: '80vh',
            margin: '0 auto',
            borderRadius: 5
            // maxHeight: 500
        }

        return(
            <div className="modal-backdrop" style={backdropStyle}>
                <div className="modal-display" style={modalStyle}>
                    <img src={this.props.card.image_url_hi_res} alt="" style={imgStyle} />
                </div>
            </div>
        )
    }
}

export default CardModal;