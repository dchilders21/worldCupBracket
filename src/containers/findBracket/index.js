import React from 'react'
import { Field, reduxForm } from 'redux-form'

let findBracket = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="findEmail__container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="findEmail">Email</label>
          <div>
            <Field name="findEmail" component="input" type="email" />
          </div>
        </div>
        <button type="submit" className="user__submit-btn">Find</button>
      </form>
    </div>
  )
}


export default reduxForm({form: 'findBracket', destroyOnUnmount: false})(findBracket);
