import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/apodActions'
import NEO from '../components/NEO'

const NEOContainer = props => (
  <NEO {...props} />
)

const mapStateToProps = state => ({
  apod: state.apod,
})

export default connect(mapStateToProps, actions)(NEOContainer)
