import React, { Suspense, useRef } from 'react';
import './App.css';
import { GridItem, ChakraProvider, Flex, Grid, Text } from '@chakra-ui/react'
import { Environment, Gltf, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Model } from './model';


function App() {
  return (
    <ChakraProvider>
      <Grid
        h='100vh'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={1}
      >
        <GridItem colSpan={2} bg='papayawhip' pl='44' pt='44'>
          <Text fontSize='8xl' fontFamily='Adobe Text Pro Semibold'>Places</Text>
          <Text fontSize='6xl' fontFamily='Adobe Text Pro'>Walk and explore the world in photogrammetry!</Text>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} >
          
          <Canvas >
            <Suspense fallback={null}>
              <Model />
              <OrbitControls />
              
            </Suspense>
          </Canvas>
        </GridItem>
        <GridItem colSpan={2} bg='' />
      </Grid>
    </ChakraProvider>


  );
}

export default App;
