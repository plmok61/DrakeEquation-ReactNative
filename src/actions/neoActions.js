import axios from 'axios'


// queries the NASA Near Earth Object API
// start and end format: YYYY-MM-DD
// start and end must be within 7 days of each other
export function getNEO(start, end) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_APOD_START' })
    const baseURL = 'https://api.nasa.gov/neo/rest/v1/feed?api_key='
    const apiKey = 'MYsfdOuaFm4HsA7dQpr8dXBtzO7bKz13cXJWwZyc'

    axios.get(`${baseURL}${apiKey}&${start}&${end}`)
      .then((response) => {
        console.log('Got NEO data: ', response.data)
        dispatch({ type: 'FETCH_NEO_COMPLETE', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_NEO_ERROR', payload: error })
      })
  }
}

export function onDateChange(value) {
  return (dispatch) => {
    console.log('Date change: ', value)
    dispatch({ type: 'NEO_DATE_CHANGE', payload: value })
  }
}
