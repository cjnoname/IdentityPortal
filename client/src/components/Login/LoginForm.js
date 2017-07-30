import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { renderField, required, email } from "../../utils/validation";

class Login extends Component {
    render() {
        // console.log(this.props)
        const { handleSubmit, pristine, submitting, valid } = this.props;
        return (
            <form onSubmit={ handleSubmit }>
                <Field
                    name="username"
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
                <button className="btn btn-default" type="submit" disabled={pristine || submitting || !valid}>Submit</button>
            </form>
        )
    }
}

const LoginForm = reduxForm({
  form: 'login',
})(Login);

export default LoginForm;