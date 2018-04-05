import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/equationActions';
import Equation from '../components/Equation';

function EquationContainer(props) {
  return (
    <Equation {...props} />
  );
}

const mapStateToProps = state => ({ ...state.equation });

export default connect(mapStateToProps, actions)(EquationContainer);
