import {
  lightBlue, teal, red, purple,
} from '../styles';

const colors = [lightBlue, teal, red, purple];

export const getRandomInt = (mini: number, maxi: number, seed: number = Math.random()): number => {
  const min = Math.ceil(mini);
  const max = Math.floor(maxi);
  return Math.floor(seed * (max - min + 1)) + min;
};

export const getRandomColor = (): string => {
  const index = getRandomInt(0, 3);
  return colors[index];
};

