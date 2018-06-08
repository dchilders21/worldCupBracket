import React from 'react'
import { Field, reduxForm } from 'redux-form'

let UserInfo = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <Field name="fullName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label htmlFor="bracketName">Bracket Name</label>
        <Field name="bracketName" component="input" type="text" />
      </div>
      <button type="submit">Next</button>
    </form>
  )
}


export default reduxForm({form: 'user', destroyOnUnmount: false})(UserInfo);
