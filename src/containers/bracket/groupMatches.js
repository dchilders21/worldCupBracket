import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import matches from '../../matches'

class GroupMatches extends React.Component {
  componentDidMount() {
    // console.log(this.props.step);
  }
  render() {
    const currentStep = this.props.step - 1;
    //const currentStep = 0;
    return(
      <div>
        <h1>Group {currentStep}</h1>
          {
            Object.keys(matches[currentStep]).map(function(group, i){
              return (
                <div key={i}>
                <p>{group}</p>
                <form onSubmit={() => this.onSubmit()}>
                  {Object.keys(matches[currentStep][group]).map(function(match, id){ return (
                      <div key={id}>
                      <p>{match}</p>
                      {Object.keys(matches[currentStep][group][match]).map(function(team, idx){ return (
                        <div>
                          <p key={idx}>{team}</p>
                          <div>
                            <label htmlFor={`team_${team}`}>Team</label>
                            <Field name={`team_${team}`} component="input" type="text" />
                          </div>
                        </div>
                      );})}
                      </div>
                  );})}

                  <button type="submit">Next</button>
                  </form>
                </div>
              );
            })
          }
        <div>

        </div>
      </div>
    );
  }
}


export default reduxForm({form: 'user', destroyOnUnmount: false})(GroupMatches);
