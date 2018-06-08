import React from 'react'
import { Field, reduxForm, getFormValues } from 'redux-form'
import Bracket from '../bracket'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserInfo from './userInfo'
import GroupMatches from './groupMatches'
import {
  increment,
  decrement,
} from '../../modules/counter'
import { addBracketToDB, getBrackets } from '../../services/dynamo'


const slideComponents = [
  UserInfo,
  GroupMatches,
]

const finalStep = 1;

class BracketContainer extends React.Component {

  submit = values => {
    // print the form values to the console
    console.log(this.props.formValues)
    if (this.props.step >= finalStep) {
      console.log('take data to database');
      console.log(values);
      console.log(JSON.stringify(values));
      addBracketToDB(JSON.stringify(values))
        .then(() => {
          console.log('finished call');
        })
    } else {
      this.props.increment();
    }
  }

  prevStep = () => {
    this.props.decrement();
  }

  componentDidMount() {
    // console.log(this.props.step);
  }
  render() {
    const currentStep = this.props.step;
    //const currentStep = 1;
    console.log('CURRENT STEP: ' + currentStep);
    let RenderingComponent;
    if (currentStep > 0) {
      RenderingComponent = slideComponents[1];
    } else {
      RenderingComponent = slideComponents[0];
    }
    return(
      <div className="bracket__container">
        <h1 className="heading--center">Bracket Container</h1>
        <div>
          <RenderingComponent onSubmit={this.submit} step={currentStep} finalStep={finalStep} prevStep={this.prevStep}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.counter.count,
  formValues: getFormValues('user')(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  decrement
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BracketContainer)
