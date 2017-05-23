const initialState = {
  fetching: false,
  neoData: {},
  error: null,
  date: new Date(),
}

export default function apodReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_NEO_START':
      return { ...state, fetching: true }
    case 'FETCH_NEO_COMPLETE':
      return { ...state, fetching: false, neoData: action.payload }
    case 'FETCH_NEO_ERROR':
      return { ...state, fetching: false, error: action.payload }
    default:
      return state
  }
}
