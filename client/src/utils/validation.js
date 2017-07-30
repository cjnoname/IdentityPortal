import React from "react"

export const required = value => (value ? undefined : 'Required')

export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div className="form-group">
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>