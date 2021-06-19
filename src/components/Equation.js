import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Animated, KeyboardAvoidingView, StyleSheet, View,
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import FlipComponent from './Flip';
import Result from './Result';
import Inputs from './Inputs';
import InfoWebView from './InfoWebView';
import {
  black, marginTop, marginBottom, equationHeight, width,
} from '../styles';
import { updateNumCivs } from '../actions/equationActions';
import TextSecondary from './TextSecondary';

export const resultHeight = 150;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: black,
  // },
  container: {
    marginTop,
    marginBottom,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
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
  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNumCivs());
  }, [dispatch]);

  const animatedOpacity = useFadeIn();

  const toggleFlip = useCallback(() => {
    setShowBack((prev) => !prev);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: animatedOpacity },
      ]}
    >
      <Result animatedScrollY={scrollY} />
      <Animated.ScrollView
        style={{
          flex: 1,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{
            nativeEvent: { contentOffset: { y: scrollY } },
          }],
          { useNativeDriver: false },
        )}
      >
        <FlipComponent
          isFlipped={showBack}
          containerStyles={styles.equationContainer}
          frontView={<Inputs toggleFlip={toggleFlip} />}
          backView={<InfoWebView toggleFlip={toggleFlip} />}
        />
      </Animated.ScrollView>
    </Animated.View>
  );
}

export default Equation;
