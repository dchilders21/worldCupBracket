import React from 'react'
import { Field, reduxForm } from 'redux-form'

let UserInfo = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="userInfo__container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <div>
            <Field name="fullName" component="input" type="text" />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <div>
            <Field name="email" component="input" type="email" />
          </div>
        </div>
        <div>
          <label htmlFor="bracketName">Bracket Name</label>
          <div>
            <Field name="bracketName" component="input" type="text" />
          </div>
        </div>
        <button type="submit" className="user__submit-btn">Next</button>
      </form>
    </div>
  )
}


export default reduxForm({form: 'user', destroyOnUnmount: false})(UserInfo);
