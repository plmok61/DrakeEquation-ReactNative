import React, { memo } from 'react';
import { func } from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import TextSecondary from './TextSecondary';
import { width, sharedStyles, lightBlue } from '../styles';

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height: '100%',
    paddingTop: 20,
  },
  infoWebView: {
    width,
    height: '100%',
  },
});

function InfoWebView({ toggleFlip }) {
  return (
    <View style={styles.infoContainer}>
      <WebView
        style={[styles.infoWebView]}
        source={{ uri: 'https://en.wikipedia.org/wiki/Drake_equation' }}
      />
      <TouchableOpacity
        onPress={toggleFlip}
        style={sharedStyles.flipButton}
      >
        <TextSecondary style={sharedStyles.flipButtonText}>
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
