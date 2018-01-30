import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../actions/auth-actions'

import './App.css';
import NavBar from '../components/Navbar'
import Welcome from '../components/Welcome'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import CardsIndex from './CardsIndex'
import CardShow from './CardShow'
import Collection from '../containers/Collection'

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
    fetch("http://mondex-api.herokuapp.com/welcome")
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
          <NavBar isAuthenticated={this.props.isAuthenticated} logout={this.props.logout} currentUser={this.props.currentUser.username || "Apparently we have no user" }/>

          {/* Other components / routes */}
          {/* <Route exact path="/" component={Welcome} currentUser={this.props.currentUser.username || "Apparently we have no user" }/> */}

          <Route exact path="/" component={() => <Welcome currentUser={this.props.currentUser.username } />}/>

          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />

          <Route exact path="/cards/:id" component={ CardShow } />
          <Route exact path="/cards" component={ CardsIndex } />
          <Route exact path="/collection" component={ Collection } />
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
