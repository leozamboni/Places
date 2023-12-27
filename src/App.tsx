import React, { Suspense, useRef } from 'react';
import './App.css';
import { GridItem, ChakraProvider, Flex, Grid, Text, Box, Image, Button, Center } from '@chakra-ui/react'
import { Environment, Gltf, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
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
        <GridItem colSpan={2} bg='yellow.200' pl='44' pt='44'>
          <Text fontSize='8xl' fontFamily='Adobe Text Pro Semibold'>Places;</Text>
          <Text fontSize='6xl' fontFamily='Adobe Text Pro'>Walk and explore the world in photogrammetry!</Text>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} >

          <Canvas >
            <Suspense fallback={null}>
              <Model />
              <PerspectiveCamera makeDefault position={[-5, -6, -33]} fov={45} />
              <OrbitControls />
            </Suspense>
          </Canvas>
        </GridItem>
        <GridItem bg='blackalpha-200' colSpan={2} position='relative'>
          <Box position='absolute' top='50%' left='0' right='0'>
            <Center>
              <Button colorScheme='teal' variant='outline'>
                Try
              </Button>
            </Center>
          </Box>

          <Box position='absolute' bottom='5' left='0' right='0'>
            <Center>
              <Text>Integrated with</Text>
            </Center>
            <Center>
              <Image w='200px' src='/sketchfab-logo.png' alt='Dan Abramov' />
            </Center>
          </Box>

        </GridItem>
      </Grid>
    </ChakraProvider>


  );
}

export default App;
