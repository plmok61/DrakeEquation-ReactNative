import React from 'react'
import { View } from 'react-native'
import TextPrimary from './TextPrimary'

const Result = (props) =>
  <View className="result">
    <TextPrimary>
      If these values are correct {props.numCivs} alien civilizations currently exist.
    </TextPrimary>
  </View>

export default Result;
