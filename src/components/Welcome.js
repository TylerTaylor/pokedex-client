import React from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
    
    render() {
        // debugger;
        return (
            <div className="welcome center container">
                { this.props.currentUser ? 
                    <h1>Welcome to Pokedex, {this.props.currentUser}</h1>
                :
                    <div> 
                        <h1>Welcome to Pokedex</h1>
                        <p>We have no user info here :(</p>
                    </div>
                }

                <div>
                    <p>
                        Your Pokedex is a place where you can keep track of the Pokemon cards in your collection.
                        This is a work in progress, but for now you can search by name, and filter by set. More features
                        coming soon, like Advanced Search, deck builders, etc.
                    </p>
                </div>

                <br />

                {/* <Button waves="light" node="a" href="/cards">View All Cards</Button> */}
                <Button waves="light"><Link to="/cards" className="white-text">View All Cards</Link></Button>

            </div>
        );
    }
};

export default Welcome;