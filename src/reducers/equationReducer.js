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
}

export default function equationReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NUM_CIVS':
      return { ...state, numCivs: action.payload }
    case 'UPDATE_INPUTS':
      return { ...state, inputs: action.payload }
    default:
      return state
  }
}
