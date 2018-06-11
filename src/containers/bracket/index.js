import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Bracket from '../bracket'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import UserInfo from './userInfo'
import GroupMatches from './groupMatches'
import matches from '../../matches'
import {
  increment,
  decrement,
} from '../../modules/counter'
import { addData }from '../../modules/bracket'
import { addBracketToDB } from '../../services/dynamo'


const slideComponents = [
  UserInfo,
  GroupMatches,
]

const finalStep = 8;

class BracketContainer extends React.Component {

  toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  formatData = data => {
    var newData = {
      "user": {
        "paid": {}
      }
    }

    var groupsLegend = {
      "A" : 0,
      "B" : 1,
      "C" : 2,
      "D" : 3,
      "E" : 4,
      "F" : 5,
      "G" : 6,
      "H" : 7,
    }

    // Loop through the data in the form store
    for (var d in data) {
      var key, group, matchNumber, team, letter;

      // user object
      if (d.includes("user")) {
        key = d.replace("user_", "");
        newData.user[key] = data[d];
      } else {
        letter = d.substring(5, 6);
        group = d.substring(0, 6);
        matchNumber = d.substring(7, 13);
        team = d.substring(14);
        team = team.replace(/_/g, ' ');
        team = this.toTitleCase(team);
        matches[groupsLegend[letter]][group][matchNumber][team] = data[d];
      }
    }
    console.log(matches);
    console.log( ' ============ ');
    console.log(newData);
    newData['matches'] = [...matches];
    this.props.addData(newData);
    return newData;
  }

  submit = values => {
    // print the form values to the console
    if (this.props.step >= finalStep) {
      console.log('take data to database');
      console.log(values);
      var data = this.formatData(values);
      addBracketToDB(JSON.stringify(data))
        .then(() => {
          this.props.goToConfirmation();
          console.log('finished call, not necessarily a success');
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
    let RenderingComponent;
    if (currentStep > 0) {
      RenderingComponent = slideComponents[1];
    } else {
      RenderingComponent = slideComponents[0];
    }
    return(
      <div className="bracket__container">
        <div>
          <div>
            <RenderingComponent onSubmit={this.submit} step={currentStep} finalStep={finalStep} prevStep={this.prevStep}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.counter.count
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  decrement,
  addData,
  goToConfirmation: () => push('/confirmation')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BracketContainer)
