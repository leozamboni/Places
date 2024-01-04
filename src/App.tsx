import React, { Suspense, useEffect, useState } from 'react';
import { Box, ChakraProvider, Text } from '@chakra-ui/react'
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './screens/home';
import { PlacesCreatorScreen } from './screens/places-creator';
import { PlacesRuntime } from './components/places-runtime';
import { PlacesRuntimeContext } from './components/places-creator';
import { RotatingLines } from 'react-loader-spinner';

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

  function loading() {
    return (
      <Box w='100vw' h='100vh' textAlign='center'>
        <Text fontSize='50pt' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-5px' transform='scale(1,0.6)'>Places</Text>
        <Box display='flex' justifyContent='center' alignItems='center' >
          <RotatingLines
            strokeColor="black"
            visible={true}
            width="30"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </Box>
      </Box>

    )
  }

  return (

    <ChakraProvider>
      {isMobile ? (<Box w='100vw' h='100vh' textAlign='center'>
        <Text fontSize='50pt' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-5px' transform='scale(1,0.6)'>Places</Text>
        Sorry Places require a computer
      </Box>) : (
        <PlacesRuntimeContext.Provider
          value={{
            placesRuntimeSettings,
            setPlacesRuntimeSettings
          }}
        >
          <React.StrictMode>
            <HashRouter>
              <Suspense fallback={loading()}>
                <Routes>
                  <Route path="/" >
                    <Route index element={<Home />} />
                    <Route path="places-creator" element={<PlacesCreatorScreen />} />
                    <Route path="places-runtime" element={<PlacesRuntime />} />
                  </Route>
                </Routes>
              </Suspense>
            </HashRouter>
          </React.StrictMode>

        </PlacesRuntimeContext.Provider>
      )}
    </ChakraProvider>
  );
}

export default App;
