import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { renderField, required, email } from "../../utils/validation";

class Register extends Component {
    render() {
        const { handleSubmit, pristine, submitting, valid } = this.props;
        return (
            <form onSubmit={ handleSubmit }>
                <Field
                    name="email"
                    type="text"
                    component={renderField}
                    label="Username"
                    validate={[required, email]}
                />
                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label="Password"
                    validate={[required]}
                />
                <Field
                    name="firstName"
                    type="text"
                    component={renderField}
                    label="First Name"
                    validate={[required]}
                />
                <Field
                    name="lastName"
                    type="text"
                    component={renderField}
                    label="Last Name"
                    validate={[required]}
                />
                <Field
                    name="address"
                    type="text"
                    component={renderField}
                    label="Address"
                    validate={[required]}
                />
                <Field
                    name="passport"
                    type="text"
                    component={renderField}
                    label="Passport"
                    validate={[required]}
                />
                <button className="btn btn-default" type="submit">Submit</button>
            </form>
        )
    }
}

const RegisterForm = reduxForm({
  form: 'register',
})(Register);

export default RegisterForm;