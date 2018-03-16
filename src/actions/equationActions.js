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
