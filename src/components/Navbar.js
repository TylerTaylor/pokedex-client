import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';
import './Navbar.css'

const NavBar = () => {
    return (
        // My component is NavBar, materialize navbar is "Navbar" lowercase b
        <Navbar brand='Pokedex' right>
            <NavLink to="/login">Login</NavLink>
        </Navbar>
    );
};

export default NavBar;