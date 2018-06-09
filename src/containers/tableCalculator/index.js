import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class TableCalculator extends React.Component {
  componentDidMount() {
    // console.log(this.props.step);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, finalStep, prevStep } = this.props

    const products = [{
        id: 1,
        name: "Product1",
        price: 120
    }, {
        id: 2,
        name: "Product2",
        price: 80
    }];

    return(
      <div>
        <BootstrapTable data={products} striped hover>
            <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
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
)(TableCalculator)
