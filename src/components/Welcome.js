import React from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
    
    render() {
        // debugger;
        return (
            <div className="center">
                { this.props.currentUser ? 
                    <h1>Welcome to Pokedex, {this.props.currentUser}</h1>
                :
                    <div> 
                        <h1>Welcome to Pokedex</h1>
                        <p>We have no user info here :(</p>
                    </div>
                }
                {/* <Button waves="light" node="a" href="/cards">View All Cards</Button> */}
                <Button waves="light"><Link to="/cards">View All Cards</Link></Button>

            </div>
        );
    }
};

export default Welcome;