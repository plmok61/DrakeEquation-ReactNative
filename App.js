import React, { useState, useCallback } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Exo2_400Regular, Exo2_700Bold } from '@expo-google-fonts/exo-2';
import { Audiowide_400Regular } from '@expo-google-fonts/audiowide';
import Equation from './src/components/Equation';
import LoadingScreen from './src/components/LoadingScreen';
import store from './src/store';

function App() {
  const [fontsLoaded] = useFonts({
    Audiowide_400Regular,
    Exo2_400Regular,
    Exo2_700Bold,
  });
  const [animationDone, setAnimationDone] = useState(false);

  const animationComplete = useCallback(() => {
    setAnimationDone(true);
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {fontsLoaded && animationDone ? (
          <Equation />
        ) : (
          <LoadingScreen
            loading={!fontsLoaded}
            animationComplete={animationComplete}
          />
        )}
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
