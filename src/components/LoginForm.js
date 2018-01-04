import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// this is importing from our user service, want it to be from auth-actions now instead
import { loginUser } from '../services/user';

import { login } from '../actions/auth-actions';

import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
    
    state = {
        username: "",
        password: ""
    }

    static contextTypes = {
        router: PropTypes.object
    }

    handleLogin = (event) => {
        event.preventDefault()
        console.log("Clicking form submit button", this.state.username, this.state.password)
        
        // send api call to the backend
        // clear fields

        const loginParams = { username: this.state.username, password: this.state.password }
        
        // OG way
        // loginUser(loginParams)
        //     .then((user) => {
        //         localStorage.setItem("jwtToken", user.jwt)
        //         this.setState({
        //             username: "",
        //             password: ""
        //         })
        //     })
        
        // new attempt
        this.props.login(loginParams, this.context.router)

    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render() {

        if (localStorage.getItem('token')) {
            return <Redirect to="/" />
        } else {
            return (
                <form onSubmit={this.handleLogin} className="login-form">
                    <h3>Login</h3>
                    <Row>
                        <Input s={12} type="text" placeholder="username" onChange={this.handleUsernameChange} value={this.state.username}/>
                        <Input s={12} type="password" placeholder="password" onChange={this.handlePasswordChange} value={this.state.password}/>
                        {<Button s={12} type="submit">Login</Button>}
                    </Row>
                </form>
            )
        }

        
    }
}

const mapStateToProps = (state) => {
    return {
        authErrors: state.auth.errors
    }
}

export default connect(mapStateToProps, { login })(LoginForm);