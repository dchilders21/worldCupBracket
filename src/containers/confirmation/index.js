import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {CSVLink, CSVDownload} from 'react-csv'

class Confirmation extends React.Component {
  componentDidMount() {
    // console.log(this.props.step);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, finalStep, prevStep } = this.props
    const user = this.props.bracket.user;
    const bracket = this.props.bracket.matches;
    let all = [];
    all.push(this.props.bracket);
    //console.log(bracket);
    console.log(all);
    console.log(typeof(all));
    // Check to see if user is in bracket
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      //console.log('nothing in the user object');
    } else {
      //console.log('bracket exists so launching');
    }

    return(
      <div>
      <CSVLink data={JSON.stringify(all)} >Download</CSVLink>
      <div className="groupRound">
        {bracket.map(function(a, currentStep){
        return (
          <div className="groupBox">
          {
            Object.keys(bracket[currentStep]).map(function(group, i){
              return (
                <div key={i}>
                <p>Group {group.slice(-1)}</p>
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
                            <div className="scoreBox">
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
