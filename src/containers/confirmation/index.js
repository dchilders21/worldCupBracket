import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Confirmation extends React.Component {
  componentDidMount() {
    // console.log(this.props.step);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, finalStep, prevStep } = this.props
    const user = this.props.bracket.user;
    const bracket = this.props.bracket.matches;
    console.log(bracket);
    // Check to see if user is in bracket
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      //console.log('nothing in the user object');
    } else {
      //console.log('bracket exists so launching');
    }
    console.log(typeof(bracket));
    console.log(bracket[0]);
    console.log(bracket[1]);

    return(
      <div>
        <h1>Confirmation</h1>

        {bracket.map(function(a, currentStep){
        return (
          <div>
          {
            Object.keys(bracket[currentStep]).map(function(group, i){
              return (
                <div key={i}>
                <p>{group}</p>
                  <div className="flex-center-container">
                    {Object.keys(bracket[currentStep][group]).map(function(match, id){
                      return (
                        <div key={id} className="flex-row" style={{display: 'flex'}}>
                        {Object.keys(bracket[currentStep][group][match]).map(function(team, idx){
                          // console.log('Es odd', i%2);
                          const currentOrder = (idx % 2) ? { order: 1} : {};
                          const currentAlign = !(idx % 2) ? { justifyContent: 'flex-end'} : {justifyContent: 'flex-start'};
                          return (
                          <div key={idx} className="flex-center-container flex-alignment" style={currentAlign}>
                            <div style={currentOrder}>
                              <p>{team}</p>
                            </div>
                            <div>
                              <div>{bracket[currentStep][group][match][team]}</div>
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
                </div>
              );
            })
          }
          </div>
        ); // for loop return
        })}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.counter.count,
  bracket: state.bracket
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation)
