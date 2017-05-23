import React, { Component, PropTypes } from 'react'
import { Image, View, StyleSheet, Dimensions } from 'react-native'
import TextSecondary from './TextSecondary'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  progress: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'absolute',
    width,
    height: 200,
  },
  progressBar: {
    width: 100,
    height: 10,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#fff',
  },
  progressFill: {
    backgroundColor: '#fff',
    height: 8,
  },
})

export default class ScaledImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      progress: 0,
      width: this.props.width,
      height: 200,
    }
  }

  componentWillMount() {
    Image.getSize(this.props.uri, (width, height) => {
      if (this.props.width && !this.props.height) {
        this.setState({ width: this.props.width, height: height * (this.props.width / width) })
      } else if (!this.props.width && this.props.height) {
        this.setState({ width: width * (this.props.height / height), height: this.props.height })
      } else {
        this.setState({ width, height })
      }
    })
  }

  render() {
    return (
      <View>
        <Image
          source={{ uri: this.props.uri }}
          style={{ height: this.state.height, width: this.state.width }}
          onLoadStart={() => this.setState({ loading: true })}
          onLoad={() => this.setState({ loading: false })}
          onProgress={(e) => {
            this.setState({
              progress: Math.round((100 * e.nativeEvent.loaded) / e.nativeEvent.total),
            })
          }}
        />
        {
          this.state.loading ?
            (<View style={styles.progress}>
              <TextSecondary>{this.state.progress}%</TextSecondary>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: this.state.progress }]}></View>
              </View>
            </View>) : null
        }
      </View>
    )
  }
}

ScaledImage.propTypes = {
  uri: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
}
