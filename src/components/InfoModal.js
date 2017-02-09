import React, { Component } from 'react'
import { Modal, View, TouchableHighlight, Text, ActivityIndicator, Image, ScrollView } from 'react-native'
import axios from 'axios'
import TextPrimary from './TextPrimary'
import TextSecondary from './TextSecondary'
import styles from '../styles'

export default class InfoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      animating: false,
      hdurl: "http://apod.nasa.gov",
      title: null,
      explanation: null,
      date: null
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.getAPOD = this.getAPOD.bind(this)
  }

  toggleModal() {
    this.setState({ visible: !this.state.visible})
  }

  getAPOD() {
    const baseURL = 'https://api.nasa.gov/planetary/apod?api_key='
    const apiKey = 'MYsfdOuaFm4HsA7dQpr8dXBtzO7bKz13cXJWwZyc'

    axios.get(`${baseURL}${apiKey}`)
      .then(response => {
        console.log(response.data)
        const { hdurl, title, explanation, date } = response.data
        console.log(title)
        this.setState({
          animating: false,
          hdurl,
          title,
          explanation,
          date
        })

      })
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
            {
              this.state.animating ? 
                <ActivityIndicator
                  animating={this.state.animating}
                  style={[styles.centering, {height: 80}]}
                  size="large"
                  color="white"
                />
              :
                <ScrollView style={styles.apodContainer}>
                  <TextPrimary>
                    {this.state.title}
                  </TextPrimary>
                  <TextSecondary>
                    {this.state.explanation}
                  </TextSecondary>
                  <Image 
                    source={{uri: this.state.hdurl}}
                    style={styles.apod}
                  />
                  <TouchableHighlight onPress={this.toggleModal}>
                    <Text style={{color: 'white'}}>Close</Text>
                  </TouchableHighlight>
                </ScrollView>
            }
          </View>
        </Modal>
        <TouchableHighlight onPress={() => {
          this.toggleModal();
          this.getAPOD()
        }}>
          <Text style={{color: 'white'}}>APOD</Text>
        </TouchableHighlight>
      </View>
    )
  }
}