import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from '../components/Navbar'
import Welcome from '../components/Welcome'
import LoginForm from '../components/LoginForm'

class App extends Component {

  componentDidMount() {
    fetch("http://localhost:3000/welcome")
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* Navbar */}
          <NavBar />

          {/* Other components / routes */}
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={LoginForm} />
        </div>
      </Router>
    );
  }
}

export default App;
