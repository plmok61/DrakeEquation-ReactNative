import React, { Component } from 'react'
import { View } from 'react-native'
import Result from './Result'
import DrakeInput from './DrakeInput'
import initialValues from './initialValues'

export default class Equation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rStar: 7,
      fPlanets: 1,
      nEarthLike: 1,
      fLife: 0.1,
      fIntelligent: 0.1,
      fComm: 0.1,
      lComm: 10000,
      numCivs: 70,
    }
    this.calculateCivs = this.calculateCivs.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }


  calculateCivs() {
    let values = []
    let inputs = this.state

    for (let key in inputs) {
      if (key !== 'numCivs') {
        values.push(inputs[key])
      }
    }

    var result = Math.round(values.reduce((result, val) => result * val))

    this.setState({
      numCivs: result
    })
  }

  changeValue(inputId, value) {
    this.setState({
      [inputId]: value
    }, this.calculateCivs)
  }

  render() {
    return (
      <View>
        <View>

          {
            initialValues.map(val => (
              <DrakeInput
                inputId={val.inputId}
                changeValue={this.changeValue}
                min={val.min}
                max={val.max}
                step={val.step}
                inputValue={val.startValue}
                descriptionText={val.descriptionText}
                key={val.inputId}
              />
            ))
          }
      
        </View>
        <Result numCivs={this.state.numCivs} />
      </View>
    )
  }
}
