import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../actions/auth-actions'

import './App.css';
import NavBar from '../components/Navbar'
import Welcome from '../components/Welcome'
import LoginForm from '../components/LoginForm'

import { authenticate, authFailure } from '../actions/auth-actions';

type Props = {
  isAuthenticated: boolean,
  logout: () => void,
  authenticate: () => void,
  authFailure: () => void
}

class App extends Component {

  props: Props

  componentDidMount() {
    fetch("http://localhost:3000/welcome")
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
      })

    const token = localStorage.getItem('token')
    if (token) {
      this.props.authenticate(token)
    } else {
      console.log("We have no token, what do?")
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* Navbar */}
          {/* <NavBar isAuthenticated={this.props.isAuthenticated} logout={this.props.logout} currentUser={this.props.currentUser.name || "Apparently we have no user" }/> */}
          <NavBar isAuthenticated={this.props.isAuthenticated} logout={this.props.logout}/>

          {/* Other components / routes */}
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={LoginForm} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  // debugger;
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout,
    authenticate,
    authFailure
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
