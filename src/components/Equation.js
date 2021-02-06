import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { Animated, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import FlipComponent from './Flip';
import Result from './Result';
import Inputs from './Inputs';
import InfoWebView from './InfoWebView';
import {
  black, marginTop, marginBottom, equationHeight, width,
} from '../styles';
import { updateNumCivs } from '../actions/equationActions';

export const resultHeight = 150;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
  },
  equationScroll: {
    marginTop,
    marginBottom,
  },
  equationContainer: {
    height: equationHeight,
    width,
  },
});

const useFadeIn = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(
        animatedOpacity,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        },
      ).start();
    };
    fadeIn();
  }, [animatedOpacity]);

  return animatedOpacity;
};

function Equation() {
  const [showBack, setShowBack] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNumCivs());
  }, [dispatch]);

  const animatedOpacity = useFadeIn();

  const toggleFlip = useCallback(() => {
    setShowBack((prev) => !prev);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={ifIphoneX(-58, 0)}
    >
      <Animated.ScrollView
        bounces={false}
        style={[
          styles.equationScroll,
          { opacity: animatedOpacity },
        ]}
      >
        <Result />
        <FlipComponent
          isFlipped={showBack}
          containerStyles={styles.equationContainer}
          frontView={<Inputs toggleFlip={toggleFlip} />}
          backView={<InfoWebView toggleFlip={toggleFlip} />}
        />
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Equation;
