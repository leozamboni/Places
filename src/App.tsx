import React, { useRef } from 'react';
import './App.css'
import { GridItem, ChakraProvider, Grid, Text, Box, Image, Button, Center, Link } from '@chakra-ui/react'
import { PlacesRuntimeDemo } from './components/places-demo-runtime/places-demo-runtime';
import { Model } from './components/place-demo-model';
import { IconBackhoe, IconBrandGithubFilled } from '@tabler/icons-react';
import { Tooltip } from 'react-tooltip';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './screens/home';
import { PlacesCreator } from './screens/places-creator';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="places-creator" element={<PlacesCreator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
