import axios from 'axios'

export function getAPOD() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_APOD_START' })
    const baseURL = 'https://api.nasa.gov/planetary/apod?api_key='
    const apiKey = 'MYsfdOuaFm4HsA7dQpr8dXBtzO7bKz13cXJWwZyc'

    axios.get(`${baseURL}${apiKey}`)
      .then((response) => {
        console.log('Got APOD data: ', response.data)
        dispatch({ type: 'FETCH_APOD_COMPLETE', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_APOD_ERROR', payload: error })
      })
  }
}
