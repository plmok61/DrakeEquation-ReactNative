import React from 'react';
import { useSelector } from 'react-redux';
import { func } from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import TextSecondary from './TextSecondary';
import styles, { purple } from '../styles';

function InfoWebView({ toggleFlip }) {
  const inputsHeight = useSelector((state) => state.equationState.inputsHeight);

  return (
    <View style={[styles.infoContainer, { height: inputsHeight }]}>
      <WebView
        style={[styles.infoWebView, { height: inputsHeight }]}
        source={{ uri: 'https://en.wikipedia.org/wiki/Drake_equation' }}
      />
      <TouchableOpacity
        onPress={toggleFlip}
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
  toggleFlip: func.isRequired,
};

export default InfoWebView;
