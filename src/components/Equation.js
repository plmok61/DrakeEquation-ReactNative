import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import Result from './Result'
import DrakeInput from './DrakeInput'
import styles from '../styles'
import inputInfo from '../inputInfo'

class Equation extends Component {
  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
    this.calculateNumCivs = this.calculateNumCivs.bind(this)
  }

  componentDidMount() {
    // Calculate the numCivs based on the initial values
    const values = Object.values(this.props.inputs)
    this.calculateNumCivs(values)
  }

  calculateNumCivs(values) {
    const numCivs = Math.round(values.reduce((acc, val) => acc * val))
    this.props.updateNumCivs(numCivs)
  }

  changeValue(inputId, value) {
    // Create a new inputs object and set to Redux state
    const inputs = { ...this.props.inputs, [inputId]: value }
    this.props.updateInputs(inputs)

    // Update the Drake Equation result in Redux state
    const values = Object.values(inputs)
    this.calculateNumCivs(values)
  }

  render() {
    const { rStar, fPlanets, nEarthLike, fLife, fIntelligent, fComm, lComm } = this.props.inputs
    return (
      <View style={styles.container}>
        <ScrollView>
          <Result numCivs={this.props.numCivs} />
          <View style={styles.equation}>
            <DrakeInput
              inputId={'rStar'}
              changeValue={this.changeValue}
              min={1}
              max={15}
              step={1}
              inputValue={rStar}
              descriptionText={'Rate of star formation: '}
              key={'rStar'}
              inputInfo={inputInfo.rStar}
            />
            <DrakeInput
              inputId={'fPlanets'}
              changeValue={this.changeValue}
              min={0}
              max={1}
              step={0.01}
              inputValue={fPlanets}
              descriptionText={'Fraction of stars with planets: '}
              key={'fPlanets'}
              inputInfo={inputInfo.fPlanets}
            />
            <DrakeInput
              inputId={'nEarthLike'}
              changeValue={this.changeValue}
              min={0}
              max={10}
              step={0.1}
              inputValue={nEarthLike}
              descriptionText={'Number of Earth-like planets per star: '}
              key={'nEarthLike'}
              inputInfo={inputInfo.nEarthLike}
            />
            <DrakeInput
              inputId={'fLife'}
              changeValue={this.changeValue}
              min={0}
              max={1}
              step={0.01}
              inputValue={fLife}
              descriptionText={'Fraction of stars with life: '}
              key={'fLife'}
              inputInfo={inputInfo.fLife}
            />
            <DrakeInput
              inputId={'fIntelligent'}
              changeValue={this.changeValue}
              min={0}
              max={1}
              step={0.01}
              inputValue={fIntelligent}
              descriptionText={'Fraction in which intelligence arises: '}
              key={'fIntelligent'}
              inputInfo={inputInfo.fIntelligent}
            />
            <DrakeInput
              inputId={'fComm'}
              changeValue={this.changeValue}
              min={0}
              max={1}
              step={0.01}
              inputValue={fComm}
              descriptionText={'Fraction that are communicative: '}
              key={'fComm'}
              inputInfo={inputInfo.fComm}
            />
            <DrakeInput
              inputId={'lComm'}
              changeValue={this.changeValue}
              min={1000}
              max={1000000000}
              step={1000}
              inputValue={lComm}
              descriptionText={'Number of years communicative: '}
              key={'lComm'}
              inputInfo={inputInfo.lComm}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

Equation.propTypes = {
  updateNumCivs: PropTypes.func.isRequired,
  updateInputs: PropTypes.func.isRequired,
  numCivs: PropTypes.number.isRequired,
  inputs: PropTypes.object.isRequired,
}

export default Equation

// const mapStateToProps = state => ({
//   numCivs: state.equation.numCivs,
//   inputs: state.equation.inputs,
// })

// const MapDispatchToProps = dispatch => ({
//   updateNumCivs(numCivs) {
//     dispatch(updateNumCivs(numCivs))
//   },
//   updateInputs(values) {
//     dispatch(updateInputs(values))
//   },
// })

// export default connect(mapStateToProps, MapDispatchToProps)(Equation)
