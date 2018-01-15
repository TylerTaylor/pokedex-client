import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signup } from '../actions/auth-actions';
import { Redirect } from 'react-router-dom';

class RegisterForm extends React.Component {

    state = {
        username: "",
        password: ""
    }

    static contextTypes = {
        router: PropTypes.object
    }

    handleRegistration = (event) => {
        event.preventDefault();
        console.log("Clicking form submit button", this.state.username, this.state.password)

        const signupParams = { 
            username: this.state.username,
            password: this.state.password
        }

        this.props.signup(signupParams, this.context.router)
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
                <form onSubmit={this.handleRegistration} className="signup-form">
                    <h3>Register</h3>
                    <Row>
                        <Input s={12} type="text" placeholder="username" onChange={this.handleUsernameChange} value={this.state.username}/>
                        <Input s={12} type="password" placeholder="password" onChange={this.handlePasswordChange} value={this.state.password}/>
                        <Button s={12} type="submit">Sign Up</Button>
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

export default connect(mapStateToProps, { signup })(RegisterForm);