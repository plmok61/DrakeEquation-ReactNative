import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, TouchableHighlight, Text, ScrollView, WebView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextPrimary from './TextPrimary';
import styles, { purple } from '../styles';

export default class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visible}
        >
          <View style={styles.infoContainer}>
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
              <WebView
                style={styles.infoWebView}
                source={{ uri: this.props.inputInfo }}
              />
            </ScrollView>
            <TouchableHighlight
              onPress={this.toggleModal}
              style={styles.closeButton}
            >
              <TextPrimary style={{ color: purple }}>Close</TextPrimary>
            </TouchableHighlight>
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
    );
  }
}
