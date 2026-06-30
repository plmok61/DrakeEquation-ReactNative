import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { Animated, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { black, purple } from '../styles';
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
  "We only have to look at ourselves to see how intelligent life might develop into something we wouldn't want to meet.",
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
  dragWrapper: {
    flex: 1,
    zIndex: 2,
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
  const [showBack, setShowBack] = useState(false);
  const scrollY = useSharedValue(0);
  const drag = useSharedValue(0);
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

  const pickQuote = useCallback(() => {
    setIndex(getRandomInt(0, quotes.length - 1));
  }, []);

  const panGesture = useMemo(
    () => Gesture.Pan()
      .onUpdate((event) => {
        'worklet';

        const { translationY } = event;

        // Drag up to reveal message
        if (translationY > (-1 * messageHeight) && translationY < 0) {
          drag.value = translationY;
        }

        // Drag down to expand result
        if (translationY < 500) {
          scrollY.value = translationY;
        }
      })
      .onEnd(() => {
        'worklet';

        scrollY.value = withTiming(0, { duration: 200, easing: Easing.linear });
        drag.value = withTiming(0, { duration: 200, easing: Easing.linear });
        runOnJS(pickQuote)();
      }),
    [drag, scrollY, pickQuote],
  );

  const containerStyle = [styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }];

  const dragAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: drag.value }],
  }));

  return (
    <KeyboardAwareScrollView contentContainerStyle={containerStyle} bounces={false}>
      <Animated.View style={[styles.animatedContainer, { opacity: animatedOpacity }]}>
        <Result scrollY={scrollY} />
        <GestureDetector gesture={panGesture}>
          <Reanimated.View style={[styles.dragWrapper, dragAnimatedStyle]}>
            <View style={styles.dragContainer}>
              <View style={styles.dragger} />
              <FlipComponent
                isFlipped={showBack}
                frontView={<Inputs toggleFlip={toggleFlip} />}
                backView={<InfoWebView toggleFlip={toggleFlip} />}
              />
            </View>
          </Reanimated.View>
        </GestureDetector>
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
