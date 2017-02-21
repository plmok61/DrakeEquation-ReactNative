const initialState = {
  fetching: false,
  apodData: {},
  error: null,
}

export default function apodReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_APOD_START':
      return { ...state, fetching: true }
    case 'FETCH_APOD_COMPLETE':
      return { ...state, fetching: false, apodData: action.payload }
    case 'FETCH_APOD_ERROR':
      return { ...state, fetching: false, error: action.payload }
    default:
      return state
  }
}
