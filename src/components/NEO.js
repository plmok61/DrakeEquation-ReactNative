import React from 'react'
import { View, DatePickerIOS } from 'react-native'
import TextPrimary from './TextPrimary'
import ButtonPrimary from './ButtonPrimary'
import styles from '../styles'

const NEO = (props) => (
  <View style={styles.container}>
    <TextPrimary>Near Earth Objects</TextPrimary>
    <DatePickerIOS
      mode={'date'}
      date={props.date}
      onDateChange={props.onDateChange}
    />
    <ButtonPrimary
      onPress={props.getNEO}
      btnText={'Will we all die?'}
    />
  </View>
)

export default NEO
