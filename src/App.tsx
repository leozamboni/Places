import React, { useEffect, useState } from 'react';
import { Box, ChakraProvider, Text } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './screens/home';
import { PlacesCreatorScreen } from './screens/places-creator';
import { PlacesRuntime } from './components/places-runtime';
import { PlacesRuntimeContext } from './components/places-creator';


function App() {
  const [placesRuntimeSettings, setPlacesRuntimeSettings] = React.useState(null);

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;

  return (

    <ChakraProvider>
      {isMobile ? (<Box w='100vw' h='100vh' textAlign='center'>
        <Text fontSize='50pt' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-5px' transform='scale(1,0.6)'>Places</Text>
        Sorry use Places with a computer
      </Box>) : (
        <PlacesRuntimeContext.Provider
          value={{
            placesRuntimeSettings,
            setPlacesRuntimeSettings
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" >
                <Route index element={<Home />} />
                <Route path="places-creator" element={<PlacesCreatorScreen />} />
                <Route path="places-runtime" element={<PlacesRuntime />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PlacesRuntimeContext.Provider>
      )}
    </ChakraProvider>
  );
}

export default App;
