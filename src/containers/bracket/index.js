import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Bracket from '../bracket'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserInfo from './userInfo'
import GroupMatches from './groupMatches'
import {
  increment,
  decrement,
} from '../../modules/counter'
import addData from '../../modules/user'

const slideComponents = [
  UserInfo,
  GroupMatches,
]

class BracketContainer extends React.Component {

  submit = values => {
    // print the form values to the console
    this.props.increment();
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
      //console.log(' ============= ');
      RenderingComponent = slideComponents[1];
    } else {
      // console.log(' ++++++++++++++ ');
      RenderingComponent = slideComponents[0];
    }
    return(
      <div>
        <h1>Bracket Container</h1>
        <div>
          <RenderingComponent onSubmit={this.submit} step={currentStep}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.counter.count,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BracketContainer)
