import React from 'react';
import PropTypes from 'prop-types';
import { View, WebView, TouchableOpacity } from 'react-native';
import TextSecondary from './TextSecondary';
import styles, { purple } from '../styles';

function InfoWebView(props) {
  return (
    <View style={[styles.infoContainer, { height: props.height }]}>
      <WebView
        style={[styles.infoWebView, { height: props.height }]}
        source={{ uri: 'https://en.wikipedia.org/wiki/Drake_equation' }}
      />
      <TouchableOpacity
        onPress={props.flip}
        style={styles.backButton}
      >
        <TextSecondary style={{ textAlign: 'center', color: purple }}>
          Back
        </TextSecondary>
      </TouchableOpacity>
    </View>
  );
}

InfoWebView.propTypes = {
  height: PropTypes.number.isRequired,
  flip: PropTypes.func.isRequired,
};

export default InfoWebView;
