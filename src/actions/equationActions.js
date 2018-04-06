// Update the individual input as the slide moves
export function updateInput(inputId, value) {
  return (dispatch) => {
    const rounded = Math.round(value * 100) / 100;
    dispatch({
      type: 'UPDATE_INPUT',
      inputId,
      value: rounded,
    });
  };
}

// Update the total with every input change
export function updateNumCivs() {
  return (dispatch, getState) => {
    const { inputs } = getState().equation;
    const values = Object.values(inputs);
    const numCivs = Math.round(values.reduce((acc, val) => acc * val));
    dispatch({
      type: 'UPDATE_NUM_CIVS',
      numCivs,
    });
  };
}

// Set the height to state so the info component can be the same height
export function setInputsHeight(inputsHeight) {
  return (dispatch) => {
    dispatch({
      type: 'SET_INPUTS_HEIGHT',
      inputsHeight,
    });
  };
}

const brackets = [10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000];

export function createOrbiters() {
  return (dispatch, getState) => {
    let count = 0;
    const { numCivs, orbiters } = getState().equation;
    const newOrbiters = orbiters.slice();

    brackets.forEach((item) => {
      if (numCivs < item) {
        count += (numCivs / (item / 10));
      } else {
        count += 10;
      }
    });

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
      type: 'UPDATE_ORBITERS',
      orbiters: newOrbiters,
    });
  };
}
