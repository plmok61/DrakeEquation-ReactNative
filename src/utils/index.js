import {
  lightBlue, teal, red, purple,
} from '../styles';

const colors = [lightBlue, teal, red, purple];

export const getRandomInt = (mini, maxi, seed = Math.random()) => {
  const min = Math.ceil(mini);
  const max = Math.floor(maxi);
  return Math.floor(seed * (max - min + 1)) + min;
};

export const getRandomColor = () => {
  const index = getRandomInt(0, 3);
  return colors[index];
};
