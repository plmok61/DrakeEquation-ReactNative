import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Animated, StyleSheet, View, Easing, useWindowDimensions,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { black, purple, resultHeight } from '../styles';
import { updateNumCivs } from '../actions/equationActions';
import { getRandomInt } from '../utils';
import TextSecondary from './TextSecondary';
import FlipComponent from './Flip';
import Result from './Result';
import Inputs from './Inputs';
import InfoWebView from './InfoWebView';

const quotes = [
  "People don't think the universe be like it is, but it do",
];

const messageHeight = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
  },
  animatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
    zIndex: 2,
  },
  message: {
    bottom: 0,
    left: 0,
    height: messageHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
  },
  dragContainer: {
    backgroundColor: black,
    alignItems: 'center',
    position: 'relative',
  },
  dragger: {
    height: 5,
    width: 35,
    backgroundColor: purple,
    borderRadius: 3,
    top: 7.5,
    position: 'absolute',
    zIndex: 4,
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
  const { height, width } = useWindowDimensions();
  const [showBack, setShowBack] = useState(false);
  const animatedScrollY = useRef(new Animated.Value(0)).current;
  const animatedDrag = useRef(new Animated.Value(0)).current;
  const [quoteIndex, setIndex] = useState(0);
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(updateNumCivs());
  }, [dispatch]);

  const animatedOpacity = useFadeIn();

  const toggleFlip = useCallback(() => {
    setShowBack((prev) => !prev);
  }, []);

  const onPanGestureEvent = useCallback(({ nativeEvent }) => {
    const { translationY } = nativeEvent;

    // Drag up to reveal message
    if (translationY > (-1 * messageHeight) && translationY < 0) {
      animatedDrag.setValue(translationY);
    }

    // Drag down to expand result
    if (translationY < 500) {
      animatedScrollY.setValue(translationY);
    }
  }, [animatedDrag, animatedScrollY]);

  const handleStateChange = useCallback(({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const ind = getRandomInt(0, quotes.length - 1);
      setIndex(ind);

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
  }, [animatedDrag, animatedScrollY]);

  const flipHeight = height - insets.top - insets.bottom - resultHeight;
  const dragStyle = {
    flex: 1,
    transform: [{
      translateY: animatedDrag,
    }],
  };
  const flipContainer = { height: flipHeight };
  return (
    <View
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 100 }]}
    >
      <Animated.View style={[styles.animatedContainer, { opacity: animatedOpacity }]}>
        <Result animatedScrollY={animatedScrollY} />
        <PanGestureHandler
          onGestureEvent={onPanGestureEvent}
          onHandlerStateChange={handleStateChange}
        >
          <Animated.View style={dragStyle}>
            <View style={styles.dragContainer}>
              <View style={styles.dragger} />
              <FlipComponent
                isFlipped={showBack}
                containerStyles={flipContainer}
                frontView={<Inputs toggleFlip={toggleFlip} />}
                backView={<InfoWebView toggleFlip={toggleFlip} />}
                frontStyles={flipContainer}
                backStyles={{ ...flipContainer, width }}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      <View style={styles.message}>
        <TextSecondary style={{ color: 'white' }}>
          "
          {quotes[quoteIndex]}
          "
        </TextSecondary>
      </View>
    </View>
  );
}

export default Equation;
