import React, { useState, useCallback } from 'react';
import { Provider } from 'react-redux';
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
  });

  
  if (fontsLoaded && animationDone) {
    return (
      <Provider store={store}>
        <Equation />
      </Provider>
    );
  }

  return (
    <LoadingScreen
      loading={!fontsLoaded}
      animationComplete={animationComplete}
    />
  );
}

export default App;
