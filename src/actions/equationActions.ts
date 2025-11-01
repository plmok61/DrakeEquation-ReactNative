import { Dispatch, AnyAction } from 'redux';

export const UPDATE_INPUT = 'UPDATE_INPUT';
export const UPDATE_NUM_CIVS = 'UPDATE_NUM_CIVS';
export const UPDATE_ORBITERS = 'UPDATE_ORBITERS';

interface EquationState {
  numCivs: number;
  inputs: {
    rStar: number;
    fPlanets: number;
    nEarthLike: number;
    fLife: number;
    fIntelligent: number;
    fComm: number;
    lComm: number;
  };
  orbiters: number[];
}

interface RootState {
  equationState: EquationState;
}

// Update the individual input as the slide moves
export function updateInput(inputId: string, value: number) {
  return (dispatch: Dispatch<AnyAction>) => {
    const rounded = Math.round(value * 100) / 100;
    dispatch({
      type: UPDATE_INPUT,
      inputId,
      value: rounded,
    });
  };
}

// Update the total with every input change
export function updateNumCivs() {
  return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const { inputs } = getState().equationState;
    const values = Object.values(inputs);
    const numCivs = Math.round(values.reduce((acc, val) => acc * val, 1));
    dispatch({
      type: UPDATE_NUM_CIVS,
      numCivs,
    });
  };
}

const brackets = [10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];

const step = 20;

export function createOrbiters() {
  return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    let count = 0;
    const { numCivs, orbiters } = getState().equationState;
    const newOrbiters = orbiters.slice();

    if (numCivs < 100) {
      count = numCivs;
    } else {
      brackets.forEach((item) => {
        if (numCivs < item) {
          count += (numCivs / (item / step));
        } else {
          count += step;
        }
      });
    }

    const { length } = orbiters;
    let i;
    if (Math.floor(count) > length) {
      for (i = length; i < count; i += 1) {
        newOrbiters.push(i);
      }
    } else if (count < length) {
      for (i = length; i >= count; i -= 1) {
        newOrbiters.pop();
      }
    }

    dispatch({
      type: UPDATE_ORBITERS,
      orbiters: newOrbiters,
    });
  };
}

