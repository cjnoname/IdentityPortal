import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { renderField, required, email } from "../../utils/validation";
import { Link } from "react-router";

class Login extends Component {
    render() {
        const { handleSubmit, pristine, submitting, valid } = this.props;
        return (
            <div>
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
                    <Link to="register" activeClassName="active" className="btn btn-success">Register</Link>
                </form>
            </div>
        )
    }
}

const LoginForm = reduxForm({
  form: 'login',
})(Login);

export default LoginForm;