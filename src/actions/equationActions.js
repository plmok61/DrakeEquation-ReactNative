export function updateNumCivs(numCivs) {
  return {
    type: 'UPDATE_NUM_CIVS',
    payload: numCivs,
  }
}

export function updateInputs(values) {
  return {
    type: 'UPDATE_INPUTS',
    payload: values,
  }
}
