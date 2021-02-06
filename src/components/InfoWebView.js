import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { func } from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import TextSecondary from './TextSecondary';
import { purple, lightBlue, width } from '../styles';

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  backButton: {
    backgroundColor: lightBlue,
    width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWebView: {
    width,
    height: '100%',
  },
});

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

export default memo(InfoWebView);
