const initialState = {
  numCivs: 0,
  inputs: {
    rStar: 3,
    fPlanets: 1,
    nEarthLike: 0.4,
    fLife: 0.01,
    fIntelligent: 0.1,
    fComm: 0.1,
    lComm: 10000,
  },
  inputsHeight: 0,
  orbiters: [0],
};

export default function equationReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NUM_CIVS':
      return { ...state, numCivs: action.numCivs };
    case 'UPDATE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: action.value,
        },
      };
    case 'SET_INPUTS_HEIGHT':
      return { ...state, inputsHeight: action.inputsHeight };
    case 'UPDATE_ORBITERS':
      return { ...state, orbiters: action.orbiters };
    default:
      return state;
  }
}
