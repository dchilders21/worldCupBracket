import React from 'react'
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableCalculator from '../tableCalculator'
import matches from '../../matches'
import { required, number } from './../../services/validations';

class GroupMatches extends React.Component {
  state = {
    currentField: 0
  }
  constructor(props) {
    super();
    this.refs = [];
  }
  componentDidMount() {
    // console.log(this.props.step);
  }

  onChangeField = e => {
    if (this.state.currentField < (this.refs.length - 1) && Number.isInteger(parseInt(e.target.value))) {
    this.setState((prevState) => ({
      currentField: prevState.currentField + 1
    }), () => {
        this.refs[this.state.currentField].focus();
    });
  }
  };

  resetFieldFocus = () => this.setState({ currentField: 0 });

  setRef = (element) => {
    console.log(this.refs, 'REF')
    this.refs = [...this.refs, element];
  }

  renderField = ({
    input,
    label,
    type,
    field,
    meta: { touched, error, warning }
  }) => (
    <div>
        <label>{touched &&
          ((error && <span className="inputError">{error}</span>) ||
            (warning && <span>{warning}</span>))}</label>
        <input ref={this.setRef} {...input} type={type} className="group__input" maxLength="1" />
    </div>
  )

  render() {
    const { handleSubmit, pristine, reset, submitting, finalStep, prevStep, error, formValues } = this.props
    const currentStep = this.props.step - 1;
    const { onChangeField, setRef, renderField } = this;

    const button = (this.props.step == finalStep) ? (
      <a className="finishButton" onClick={handleSubmit}>Finish
      </a>
    ) : (
      <div className="rightArrow">
        <a onClick={(e) => {handleSubmit(e); this.props.reset(); this.resetFieldFocus()}}>
        </a>
      </div>
    );
    return(
      <div>
          {
            Object.keys(matches[currentStep]).map(function(group, i){
              return (
                <div key={i}>
                <h1>Group {group.slice(-1)}</h1>
                <form onSubmit={handleSubmit}>
                  <div className="flex-center-container">
                    {Object.keys(matches[currentStep][group]).map(function(match, id){
                      return (
                        <div key={id} className="flex-row" style={{display: 'flex'}}>
                        {Object.keys(matches[currentStep][group][match]).map(function(team, idx){
                          // console.log('Es odd', i%2);
                          const currentOrder = (idx % 2) ? { order: 1} : {};
                          const currentAlign = !(idx % 2) ? { justifyContent: 'flex-end'} : {justifyContent: 'flex-start'};
                          return (
                          <div key={idx} className="flex-center-container flex-alignment" style={currentAlign}>
                            <div style={currentOrder}>
                              <p>{team}</p>
                            </div>
                            <div>
                              <Field onChange={onChangeField} name={`${group}_${match}_${team.replace(/\s+/g, '_').toLowerCase()}`} component={renderField} validate={[required, number]} type="text" />
                            </div>
                            {!(idx % 2) && <div className="group__divisor">:</div>}
                          </div>
                        );})}
                        </div>
                      );})}
                      </div>
                  {((currentStep - 1) < finalStep) &&
                    <div className="flex-center-container nextPrev">
                      <div className="leftArrow">
                        <a onClick={prevStep}>
                        </a>
                      </div>
                      {button}
                    </div>
                  }

                  </form>
                  <TableCalculator formValues={{...formValues}} groupName={group}/>
                </div>

              );
            })
          }

      </div>
    );
  }
}

const selector = getFormValues('user')
GroupMatches = connect( state => ({ formValues: selector(state) }) )(GroupMatches)




export default reduxForm({form: 'user', destroyOnUnmount: false})(GroupMatches);
