import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Animated, StyleSheet, View, Easing, useWindowDimensions,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { black, purple, resultHeight } from '../styles';
import { updateNumCivs } from '../actions/equationActions';
import { getRandomInt } from '../utils';
import TextSecondary from './TextSecondary';
import FlipComponent from './Flip';
import Result from './Result';
import Inputs from './Inputs';
import InfoWebView from './InfoWebView';
import useFadeIn from '../hooks/useFadeIn';

const quotes = [
  "People don't think the universe be like it is, but it do",
  'We are a way for the cosmost to know itself',
  'We only have to look at ourselves to see how intelligent life might develop into something we wouldn’t want to meet.',
  'Someday, from somewhere out among the stars, will come the answers to many of the oldest, most important, and most exciting questions mankind has asked.',
  "The dinosaurs became extinct because they didn't have a space program. And if we become extinct because we don't have a space program, it'll serve us right!",
];

const messageHeight = 75;

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
  },
  message: {
    bottom: 0,
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
  const flipContainer = { height: flipHeight };

  const containerStyle = [styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }];
  const dragStyle = {
    flex: 1,
    zIndex: 2,
    transform: [{
      translateY: animatedDrag,
    }],
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={containerStyle} bounces={false}>
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
        <View style={styles.message}>
          <TextSecondary style={{ color: 'white', paddingHorizontal: 15 }}>
            "
            {quotes[quoteIndex]}
            "
          </TextSecondary>
        </View>
      </Animated.View>
    </KeyboardAwareScrollView>
  );
}

export default Equation;
