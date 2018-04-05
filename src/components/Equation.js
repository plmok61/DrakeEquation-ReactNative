import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, KeyboardAvoidingView } from 'react-native';
import FlipComponent from 'react-native-flip-component';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Result from './Result';
import Inputs from './Inputs';
import InfoWebView from './InfoWebView';
import styles from '../styles';

class Equation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBack: false,
    };
    this.animatedOpacity = new Animated.Value(0);
    this.flip = this.flip.bind(this);
  }

  // Calculate the numCivs based on the initial values
  componentDidMount() {
    this.props.updateNumCivs(this.props.inputs);
    this.fadeIn();
  }

  flip() {
    this.setState({
      showBack: !this.state.showBack,
    });
  }

  fadeIn() {
    Animated.timing(
      this.animatedOpacity,
      {
        toValue: 1,
        duration: 1000,
      },
    ).start();
  }

  render() {
    const { props } = this;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={ifIphoneX(-58, 0)}
      >
        <Animated.ScrollView bounces={false} style={[styles.equationContainer, { opacity: this.animatedOpacity }]}>
          <Result numCivs={props.numCivs} />
          <FlipComponent
            isFlipped={this.state.showBack}
            frontView={
              <Inputs
                {...props}
                flip={this.flip}
              />
            }
            backView={
              <InfoWebView
                height={this.props.inputsHeight}
                flip={this.flip}
              />
            }
          />
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

Equation.propTypes = {
  updateNumCivs: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
  inputsHeight: PropTypes.number.isRequired,
};

export default Equation;
