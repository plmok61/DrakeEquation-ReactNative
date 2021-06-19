import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Animated, KeyboardAvoidingView, StyleSheet, View, Easing,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import FlipComponent from './Flip';
import Result from './Result';
import Inputs from './Inputs';
import InfoWebView from './InfoWebView';
import {
  black, marginTop, marginBottom, equationHeight, width, lightBlue, purple, height,
} from '../styles';
import { updateNumCivs } from '../actions/equationActions';
import TextSecondary from './TextSecondary';

export const resultHeight = 150;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
  },
  animatedContainer: {
    marginTop,
    marginBottom,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
    zIndex: 2,
  },
  equationContainer: {
    height: equationHeight,
    width,
  },
  message: {
    bottom: 0,
    height: 150,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
  const animatedScrollY = useRef(new Animated.Value(0)).current;
  const animatedDrag = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNumCivs());
  }, [dispatch]);

  const animatedOpacity = useFadeIn();

  const toggleFlip = useCallback(() => {
    setShowBack((prev) => !prev);
  }, []);

  const onPanGestureEvent = ({ nativeEvent }) => {
    console.log(nativeEvent);
    const { translationY } = nativeEvent;

    if (translationY > -150 && translationY < 0) {
      animatedDrag.setValue(translationY);
    }
    if (translationY < 500) {
      animatedScrollY.setValue(translationY);
    }
  };

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      Animated.parallel([
        Animated.timing(
          animatedScrollY,
          {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          },
        ),
        Animated.timing(
          animatedDrag,
          {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
      ]).start();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={ifIphoneX(-58, 0)}
    >
      <Animated.View
        style={[
          styles.animatedContainer,
          { opacity: animatedOpacity },
        ]}
      >
        <Result animatedScrollY={animatedScrollY} />
        <PanGestureHandler
          onGestureEvent={onPanGestureEvent}
          onHandlerStateChange={handleStateChange}
        >
          <Animated.View
            style={{
              flex: 1,
              transform: [{
                translateY: animatedDrag,
              }],
            }}
          >
            <View style={{
              backgroundColor: lightBlue,
              alignItems: 'center',
            }}
            >
              <View style={{
                height: 6,
                width: 35,
                backgroundColor: purple,
                borderRadius: 3,
                marginTop: 5,
              }}
              />
              <FlipComponent
                isFlipped={showBack}
                containerStyles={styles.equationContainer}
                frontView={<Inputs toggleFlip={toggleFlip} />}
                backView={<InfoWebView toggleFlip={toggleFlip} />}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      <View style={styles.message}>
        <TextSecondary style={{ color: 'white' }}>
          Hi
        </TextSecondary>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Equation;
