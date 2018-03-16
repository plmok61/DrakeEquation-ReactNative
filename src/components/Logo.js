import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';

function Logo() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient
        colors={['#222', '#483d8b']}
        style={{
          height: 170,
          width: 170,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'Exo-2',
            color: '#d9eaee',
            textAlign: 'center',
            fontSize: 50,
          }}
        >
          DRAKE
        </Text>
        <Text
          style={{
            fontFamily: 'Exo-2',
            color: '#d9eaee',
            textAlign: 'center',
            fontSize: 32,
          }}
        >
          EQUATION
        </Text>
      </LinearGradient>
    </View>

  );
}

export default Logo;
