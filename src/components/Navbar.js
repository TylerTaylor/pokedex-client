import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';
import PropTypes from 'prop-types';
import './Navbar.css'


type Props = {
    isAuthenticated: boolean,
    logout: () => void
}

class NavBar extends React.Component {

    constructor(props) {
        super(props)

        // debugger;
        this.handleLogout = this.handleLogout.bind(this)
    }

    static contextTypes = {
        router: PropTypes.object
    }
    
    props: Props

    handleLogout() {
        this.props.logout(this.context.router)
    }

    render() {
        // debugger;
        return (
            // My component is NavBar, materialize navbar is "Navbar" lowercase b
            <Navbar brand='Pokedex' right>
                { this.props.isAuthenticated ? 
                    <NavLink to="/" onClick={this.handleLogout}>Sign Out</NavLink>
                :
                    <div className="nav-links">
                        <NavLink to="/register">Sign Up</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        {/* <NavItem href="/register">Sign Up</NavItem> */}
                        {/* <NavItem><NavLink to="/login">Login</NavLink></NavItem> */}
                        
                    </div>
                }
            </Navbar>
        );
    }
};

export default NavBar;