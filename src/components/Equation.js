import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Animated, KeyboardAvoidingView } from 'react-native';
import FlipComponent from 'react-native-flip-component';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Result from './Result';
import Inputs from './Inputs';
import InfoWebView from './InfoWebView';
import styles from '../styles';
import { updateNumCivs } from '../actions/equationActions';

const useFadeIn = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(
      animatedOpacity,
      {
        toValue: 1,
        duration: 1000,
      },
    ).start();
  }

  useEffect(() => {
    fadeIn();
  }, []);

  return animatedOpacity;
}

function Equation() {
  const [showBack, setShowBack] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNumCivs())    
  }, []);

  const animatedOpacity = useFadeIn();

  const toggleFlip = useCallback(() => {
    setShowBack(!showBack);
  }, [showBack]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={ifIphoneX(-58, 0)}
    >
      <Animated.ScrollView 
        bounces={false} 
        style={[
          styles.equationContainer,
          { opacity: animatedOpacity }
        ]}
      >
        <Result />
        <FlipComponent
          isFlipped={showBack}
          frontView={<Inputs toggleFlip={toggleFlip} />}
          backView={<InfoWebView toggleFlip={toggleFlip} />}
        />
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Equation;
