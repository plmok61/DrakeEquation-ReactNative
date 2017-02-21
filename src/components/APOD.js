import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { getAPOD } from '../actions/apodActions'
import TextPrimary from './TextPrimary'
import TextSecondary from './TextSecondary'
import ScaledImage from './ScaledImage'
import styles from '../styles'

class APOD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animating: true,
      hdurl: 'http://apod.nasa.gov',
      title: null,
      explanation: null,
      date: null,
    }
  }

  componentDidMount() {
    console.log('APOD props: ', this.props)
    this.props.getAPOD()
  }

  // getAPOD() {
  //   const baseURL = 'https://api.nasa.gov/planetary/apod?api_key='
  //   const apiKey = 'MYsfdOuaFm4HsA7dQpr8dXBtzO7bKz13cXJWwZyc'

  //   axios.get(`${baseURL}${apiKey}`)
  //     .then((response) => {
  //       console.log(response.data)
  //       const { hdurl, title, explanation, date, media_type } = response.data
  //       if (media_type === 'image') {
  //         this.setState({
  //           animating: false,
  //           hdurl,
  //           title,
  //           explanation,
  //           date,
  //         })
  //       }
  //     })
  // }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.animating ?
            <ActivityIndicator
              animating={this.state.animating}
              style={[styles.centering, { height: 80 }]}
              size="large"
              color="white"
            />
          :
            <ScrollView>
              <ScaledImage
                uri={this.state.hdurl}
                width={Dimensions.get('window').width}
              />
              <View style={styles.apodText}>
                <TextPrimary>
                  {this.state.title}
                </TextPrimary>
                <TextSecondary>
                  {this.state.explanation}
                </TextSecondary>
              </View>
            </ScrollView>
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  apod: state.apod,
})

const mapDispatchToProps = dispatch => ({
  getAPOD() {
    dispatch(getAPOD())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(APOD)
