import React, { useRef } from 'react';
import './App.css'
import { GridItem, ChakraProvider, Grid, Text, Box, Image, Button, Center } from '@chakra-ui/react'
import { PlacesRuntimeDemo } from './components/places-runtime-demo';


function App() {
  const pointerLockControlsRef = useRef()
  return (
    <ChakraProvider>
      <Grid
        h='100vh'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={1}
      >
        <GridItem colSpan={2} bg='yellow.200' position='relative'>
          <Box position='absolute' left='15%' top='20%'>
            <Text fontSize='9xl' fontFamily='Adobe Text Pro Semibold' transform='scale(1,0.7)' >Places</Text>
            <Text fontSize='6xl' fontFamily='Adobe Text Pro' mt='-70px' transform='scale(1,0.7)' >Walk and explore the world in photogrammetry!</Text>
          </Box>

        </GridItem>
        <GridItem rowSpan={2} colSpan={2} position='relative'>
          <PlacesRuntimeDemo pointerLockControlsRef={pointerLockControlsRef} />
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
