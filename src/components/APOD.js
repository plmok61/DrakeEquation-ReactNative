import React, { Component, PropTypes } from 'react'
import { View, ActivityIndicator, ScrollView, Dimensions, WebView, RefreshControl } from 'react-native'
import TextPrimary from './TextPrimary'
import TextSecondary from './TextSecondary'
import ScaledImage from './ScaledImage'
import styles from '../styles'

class APOD extends Component {

  componentDidMount() {
    this.props.getAPOD()
  }

  render() {
    const { fetching, apodData, error } = this.props.apod

    if (fetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={fetching}
            style={[styles.centering, { height: 80 }]}
            size="large"
            color="white"
          />
        </View>
      )
    }

    if (apodData.media_type === 'image') {
      return (
        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={fetching}
                onRefresh={this.props.getAPOD}
              />
            }
          >
            <ScaledImage
              uri={apodData.hdurl}
              width={Dimensions.get('window').width}
            />
            <View style={styles.apodText}>
              <TextPrimary>
                {apodData.title}
              </TextPrimary>
              <TextSecondary>
                {apodData.explanation}
              </TextSecondary>
            </View>
          </ScrollView>
        </View>
      )
    } else if (apodData.media_type === 'video') {
      return (
        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={fetching}
                onRefresh={this.props.getAPOD}
              />
            }
          >
            <WebView
              style={styles.apodVideo}
              source={{ uri: apodData.url }}
            />
            <View style={styles.apodText}>
              <TextPrimary>
                {apodData.title}
              </TextPrimary>
              <TextSecondary>
                {apodData.explanation}
              </TextSecondary>
            </View>
          </ScrollView>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <TextPrimary>Error: {error}</TextPrimary>
      </View>
    )
  }
}

APOD.propTypes = {
  getAPOD: PropTypes.func.isRequired,
  apod: PropTypes.object,
}

export default APOD
