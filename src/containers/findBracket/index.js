import React from 'react'
import { Field, reduxForm } from 'redux-form'

let findBracket = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="findEmail__container">
      <form>
        <div className="findEmail__group">
          <label htmlFor="findEmail">Email</label>
          <div className="findDiv">
            <Field name="findEmail" component="input" type="email" />
          </div>
          <a className="findButton finishButton" onClick={handleSubmit}>Find
          </a>
        </div>
      </form>
    </div>
  )
}


export default reduxForm({form: 'findBracket', destroyOnUnmount: false})(findBracket);
