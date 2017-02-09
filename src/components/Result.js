import React from 'react'
import { View } from 'react-native'
import TextSecondary from './TextSecondary'
import styles from '../styles'

const Result = (props) =>
  <View style={styles.result}>
    <TextSecondary style={{fontSize: 20, textAlign: 'center'}}>
      Alien civilizations in the Milky Way:
    </TextSecondary>
    <TextSecondary style={{fontSize: 40}}>
      {props.numCivs}
    </TextSecondary>
  </View>

export default Result;
