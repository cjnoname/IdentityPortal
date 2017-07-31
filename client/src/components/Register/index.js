import React, { Component } from "react";
import { connect } from "react-redux";
import RegisterForm from "./RegisterForm";
import { registerRequestAct } from "../../actions"

class WrappedRegisterForm extends Component {
    handleSubmit = (values) => {
        console.log("values: ", values);
        const { email, password, firstName, lastName, address, passport } = values;
        this.props.register(email, password, firstName, lastName, address, passport);
    }

    render () {
        return <RegisterForm onSubmit={this.handleSubmit} />
    }
}

function mapDispatchToProps (dispatch) {
    return {
        register: (email, password, firstName, lastName, address, passport) => dispatch(registerRequestAct(email, password, firstName, lastName, address, passport))
    }
}

export default connect(null, mapDispatchToProps)(WrappedRegisterForm);