const initialState = {
  result: 70,
}

export default function equationReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_RESULT':
      return { ...state, result: action.payload }
    default:
      return state
  }
}
