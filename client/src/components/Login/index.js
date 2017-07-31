import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { loginRequestAct } from "../../actions"

class WrappedLoginForm extends Component {
    handleSubmit = (values) => {
        this.props.login(values.username, values.password);
    }

    render () {
        return <LoginForm onSubmit={this.handleSubmit} />
    }
}

function mapDispatchToProps (dispatch) {
    return {
        login: (username, password) => dispatch(loginRequestAct(username, password))
    }
}

export default connect(null, mapDispatchToProps)(WrappedLoginForm);