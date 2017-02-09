import React, { Component } from 'react'
import { Modal, View, TouchableHighlight, Text, ActivityIndicator, Image } from 'react-native'
import axios from 'axios'
import TextSecondary from './TextSecondary'
import styles from '../styles'

export default class InfoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      animating: true,
      hdurl: null,
      title: null,
      explanation: null
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
        const { hdurl, title, explanation } = response.data
        console.log(title)
        this.setState({
          animating: false,
          hdurl,
          title,
          explanation
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
                <View>
                  <TextSecondary>
                    {this.state.title}
                  </TextSecondary>
                  <Image 
                    source={{uri: 'http://apod.nasa.gov/apod/image/1702/PIA20522enceladus.jpg'}}
                    style={{height: 300, width: 300}}
                  />
                  <TouchableHighlight onPress={this.toggleModal}>
                    <Text style={{color: 'white'}}>Close</Text>
                  </TouchableHighlight>
                </View>
            }
          </View>
        </Modal>
        <TouchableHighlight onPress={() => {
          this.toggleModal();
          this.getAPOD()
        }}>
          <Text style={{color: 'white'}}>More Info</Text>
        </TouchableHighlight>
      </View>
    )
  }
}