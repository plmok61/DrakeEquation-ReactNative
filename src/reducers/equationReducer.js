const initialState = {
  numCivs: 70,
  inputs: {
    rStar: 7,
    fPlanets: 1,
    nEarthLike: 1,
    fLife: 0.1,
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
