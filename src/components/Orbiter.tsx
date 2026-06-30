import React, { memo, useEffect, useRef } from 'react';
import { ViewStyle, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { lightBlue } from '../styles';
import { getRandomInt, getRandomColor } from '../utils';

interface OrbiterProps {
  // scroll position shared value driving the result-plane tilt
  scrollY: SharedValue<number>;
  scrollDistance: number;
  size?: number;
  radius?: number;
  duration?: number;
  customStyle?: ViewStyle;
  color?: string;
  randomStart?: boolean;
}

interface OrbitParams {
  r: number;
  d: number;
  startOffset: number;
  diameter: number;
  backgroundColor: string;
}

function Orbiter({
  scrollY,
  scrollDistance,
  size = 0,
  radius = 0,
  duration = 0,
  customStyle,
  color = '',
  randomStart = false,
}: OrbiterProps) {
  const { width } = useWindowDimensions();

  // Derive the per-orbiter parameters exactly once. Previously these were
  // recomputed with Math.random() on every render, which restarted the orbit.
  const paramsRef = useRef<OrbitParams | null>(null);
  if (paramsRef.current === null) {
    const r = radius || getRandomInt(1, width / 2);
    paramsRef.current = {
      r,
      d: duration || 5000 + r * 50,
      startOffset: randomStart ? Math.random() : 0,
      diameter: size || getRandomInt(1, 10),
      backgroundColor: color && color.length ? color : getRandomColor(),
    };
  }
  const {
    r, d, startOffset, diameter, backgroundColor,
  } = paramsRef.current;

  // progress runs 0 -> 1 forever; since the position is periodic in progress
  // the wrap from 1 back to 0 lands on the same point, so there is no jump.
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: d, easing: Easing.linear }),
      -1,
      false,
    );
    // run once per instance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The orbital plane is tilted, so foreshorten the vertical axis of the orbit
  // directly (instead of via a parent rotateX, which Fabric does not reliably
  // project onto transformed children). The factor is cos(tilt) for
  // tilt = 60,45,30,15,0 degrees: 0.5 at rest -> 1.0 (flat circle) when dragged.
  // The dots themselves stay perfect circles.
  const tiltInput = [0, 0.25, 0.5, 0.75, 1].map((f) => f * scrollDistance);
  const tiltOutput = [0.5, 0.70710678, 0.8660254, 0.96592583, 1];

  const animatedStyle = useAnimatedStyle(() => {
    const angle = (progress.value + startOffset) * 2 * Math.PI;
    const foreshorten = interpolate(scrollY.value, tiltInput, tiltOutput, Extrapolation.CLAMP);
    const transform: ViewStyle['transform'] = [
      { translateX: Math.sin(angle) * r },
      { translateY: -Math.cos(angle) * r * foreshorten },
    ];
    return { transform };
  });

  return (
    <Animated.View
      style={[
        {
          height: diameter,
          width: diameter,
          borderRadius: diameter / 2,
          backgroundColor,
          shadowColor: lightBlue,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 1,
        },
        customStyle,
        animatedStyle,
      ]}
    />
  );
}

// size never changes, so this component should never need to re-render
const isEqual = (prevProps: OrbiterProps, nextProps: OrbiterProps) => nextProps.size === prevProps.size;

const OrbiterMemo = memo(Orbiter, isEqual);

export default OrbiterMemo;
