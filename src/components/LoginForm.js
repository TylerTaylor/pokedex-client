import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import { loginUser } from '../services/user';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
    
    state = {
        username: "",
        password: ""
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log("Clicking form submit button", this.state.username, this.state.password)
        // send api call to the backend
        // clear fields

        const loginParams = { username: this.state.username, password: this.state.password }
        
        loginUser(loginParams)
            .then((user) => {
                localStorage.setItem("jwtToken", user.jwt)
                this.setState({
                    username: "",
                    password: ""
                })
            })     
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

        if (localStorage.getItem('jwtToken')) {
            return <Redirect to="/" />
        } else {
            return (
                <form onSubmit={this.handleSubmit} className="login-form">
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

export default LoginForm;