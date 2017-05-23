export function updateNumCivs() {
  return (dispatch, getState) => {
    const inputs = getState().equation.inputs
    const values = Object.values(inputs)
    const numCivs = Math.round(values.reduce((acc, val) => acc * val))
    dispatch({
      type: 'UPDATE_NUM_CIVS',
      payload: numCivs,
    })
  }
}

export function updateInput(inputId, value) {
  return (dispatch) => {
    const rounded = Math.round(value * 100) / 100
    dispatch({
      type: 'UPDATE_INPUT',
      inputId,
      value: rounded,
    })
  }
}
