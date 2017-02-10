import React, { Component } from 'react'
import { Modal, View, TouchableHighlight, Text, Image, ScrollView } from 'react-native'
import TextPrimary from './TextPrimary'
import TextSecondary from './TextSecondary'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../styles'

export default class InfoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({ visible: !this.state.visible})
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.visible}
        >
          <View style={styles.container}>        
            <ScrollView style={styles.apodContainer}>
              <TextPrimary>
                Title
              </TextPrimary>
              <TextSecondary>
                Explanation text
              </TextSecondary>
              <TouchableHighlight onPress={this.toggleModal}>
                <Text style={{color: 'white'}}>Close</Text>
              </TouchableHighlight>
            </ScrollView>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.toggleModal();
          }}
        >
          <Icon name="info-circle" size={15} color="darkslateblue" />
        </TouchableHighlight>
      </View>
    )
  }
}