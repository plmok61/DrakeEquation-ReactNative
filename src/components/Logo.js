import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    height: 170,
    width: 170,
    justifyContent: 'center',
  },
  drake: {
    fontFamily: 'Exo2_400Regular',
    color: '#d9eaee',
    textAlign: 'center',
    fontSize: 50,
  },
  equation: {
    fontFamily: 'Exo2_400Regular',
    color: '#d9eaee',
    textAlign: 'center',
    fontSize: 32,
  },
});

const gradColors = ['#222', '#483d8b'];

function Logo() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradColors}
        style={styles.gradient}
      >
        <Text style={styles.drake}>
          DRAKE
        </Text>
        <Text style={styles.equation}>
          EQUATION
        </Text>
      </LinearGradient>
    </View>

  );
}

export default Logo;
