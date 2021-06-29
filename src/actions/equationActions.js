export const UPDATE_INPUT = 'UPDATE_INPUT';
export const UPDATE_NUM_CIVS = 'UPDATE_NUM_CIVS';
export const UPDATE_ORBITERS = 'UPDATE_ORBITERS';

// Update the individual input as the slide moves
export function updateInput(inputId, value) {
  return (dispatch) => {
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
  return (dispatch, getState) => {
    const { inputs } = getState().equationState;
    const values = Object.values(inputs);
    const numCivs = Math.round(values.reduce((acc, val) => acc * val));
    dispatch({
      type: UPDATE_NUM_CIVS,
      numCivs,
    });
  };
}

const brackets = [10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];

const step = 20;

export function createOrbiters() {
  return (dispatch, getState) => {
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
