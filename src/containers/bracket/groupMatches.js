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
    const { handleSubmit, pristine, reset, submitting, finalStep, prevStep } = this.props
    const currentStep = this.props.step - 1;

    const button = (this.props.step == finalStep) ? (
      <button type="submit">Finish</button>
    ) : (
      <button type="submit">Next</button>
    );

    return(
      <div>
        <h1>Group {currentStep}</h1>
          {
            Object.keys(matches[currentStep]).map(function(group, i){
              return (
                <div key={i}>
                <p>{group}</p>
                <form onSubmit={handleSubmit}>
                  <div className="flex-center-container">
                    {Object.keys(matches[currentStep][group]).map(function(match, id){ return (
                        <div key={id} className="flex-row" style={{display: 'flex'}}>
                        {Object.keys(matches[currentStep][group][match]).map(function(team, idx){
                          console.log('Es odd', i%2);
                          const currentOrder = (idx % 2) ? { order: 1} : {};
                          const currentAlign = !(idx % 2) ? { justifyContent: 'flex-end'} : {justifyContent: 'flex-start'};
                          return (
                          <div className="flex-center-container flex-alignment" style={currentAlign}> 
                            <div style={currentOrder}>
                              <p key={idx}>{team}</p>
                            </div>
                            <div>
                              <Field name={`${group}_${match}_${team.replace(/\s+/g, '_').toLowerCase()}`} component="input" type="text" className="group__input" />
                            </div>
                            {!(idx % 2) && <div className="group__divisor">:</div>}
                          </div>
                        );})}
                        </div>
                      );})}
                      </div>
                  {((currentStep - 1) < finalStep) &&
                    <a onClick={prevStep}>
                      Previous
                    </a>
                  }
                  {button}
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


export default reduxForm({form: 'groupA', destroyOnUnmount: false})(GroupMatches);
