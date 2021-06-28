import React, { memo } from 'react';
import { func } from 'prop-types';
import {
  View, TouchableOpacity, StyleSheet, useWindowDimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import TextSecondary from './TextSecondary';
import { sharedStyles, lightBlue } from '../styles';

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 20,
  },
  infoWebView: {
    // Webview seems to not understand width 100%
    // width: '100%',
    height: '100%',
  },
});

function InfoWebView({ toggleFlip }) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.infoContainer}>
      <WebView
        style={[styles.infoWebView, { width }]}
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
