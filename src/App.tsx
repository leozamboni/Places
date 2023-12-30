import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './screens/home';
import { PlacesCreatorScreen } from './screens/places-creator';
import { PlacesRuntime } from './components/places-runtime';
import { PlacesRuntimeContext } from './components/places-creator';


function App() {
  const [placesRuntimeSettings, setPlacesRuntimeSettings] = React.useState(null);
  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
}

export default App;
