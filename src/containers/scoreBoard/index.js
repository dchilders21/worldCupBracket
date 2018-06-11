import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllBrackets } from '../../services/dynamo'
import { addData }from '../../modules/bracket'

class ScoreBoard extends React.Component {
  state = {
    data: []
  }
  componentDidMount() {
    this.findScores();
    // console.log(this.props.step);
  }

  findScores = () => {
    console.log('inside find scores');
    const brackets = getAllBrackets()
      .then(response => {
        console.log(response.data.brackets);
        console.log(response.data.brackets[0]);
        this.setState({ data: response.data.brackets})
        return ['test', 'test 2', 'test 3']
      })
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, finalStep, prevStep } = this.props

    //const data = this.findScores();
    //console.log(data);

    return(
      <div>
        {this.state.data && this.state.data}
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
  mapDispatchToProps,
)(ScoreBoard)
