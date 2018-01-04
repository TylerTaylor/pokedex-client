import React from 'react';

class Welcome extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        // debugger;
        return (
            <div>
                { this.props.currentUser ? 
                    <h1>Welcome to Pokedex, {this.props.currentUser}</h1>
                :
                    <div> 
                        <h1>Welcome to Pokedex</h1>
                        <p>We have no user info here :(</p>
                    </div>
                }
            </div>
        );
    }
};

export default Welcome;