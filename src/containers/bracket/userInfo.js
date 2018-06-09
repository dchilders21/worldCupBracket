import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required, email } from './../../services/validations';


let UserInfo = props => {
  const { handleSubmit, pristine, reset, submitting, error } = props

  const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
        <label>{label}{touched &&
          ((error && <span className="inputError">{error}</span>) ||
            (warning && <span>{warning}</span>))}</label>
        <input {...input} type={type} />
    </div>
  )

  return (
    <div className="userInfo__container">
      <form onSubmit={handleSubmit}>
        <div className="user__div">
          <div>
            <Field name="user_fullName" label="Full Name" component={renderField} type="text" validate={[required]}/>
          </div>
        </div>
        <div className="user__div">
          <div>
            <Field name="user_email" label="Email" component={renderField} type="email" validate={[required, email]}/>
          </div>
        </div>
        <div className="user__div">
          <div>
            <Field name="user_bracketName" label="Bracket Name" component={renderField} type="text" validate={[required]}/>
          </div>
        </div>
        <span>{error}</span>
        <div className="arrowCentered rightArrow">
          <a onClick={handleSubmit}>
          </a>
        </div>
      </form>
      {error}
    </div>
  )
}


export default reduxForm({form: 'user', destroyOnUnmount: false})(UserInfo);
