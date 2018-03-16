import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/equationActions';
import Equation from '../components/Equation';

const EquationContainer = props => (
  <Equation {...props} />
);


const mapStateToProps = state => ({
  numCivs: state.equation.numCivs,
  inputs: state.equation.inputs,
});

export default connect(mapStateToProps, actions)(EquationContainer);
