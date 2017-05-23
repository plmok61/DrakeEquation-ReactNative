import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/apodActions'
import APOD from '../components/APOD'

const APODContainer = props => (
  <APOD {...props} />
)

const mapStateToProps = state => ({
  apod: state.apod,
})

export default connect(mapStateToProps, actions)(APODContainer)
