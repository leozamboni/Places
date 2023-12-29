import React, { useRef } from 'react';
import './App.css'
import { GridItem, ChakraProvider, Grid, Text, Box, Image, Button, Center } from '@chakra-ui/react'
import { PlacesRuntimeDemo } from './components/places-demo-runtime/places-demo-runtime';
import { Model } from './components/place-demo-model';

function App() {
  return (
    <ChakraProvider>
      <Grid
        h='100vh'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={1}
      >
        <GridItem colSpan={2} bg='#ffcc00' position='relative'>
          <Box position='absolute' left='15%' top='20%' color='black'>
            <Text fontSize='130pt' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-8px' transform='scale(1,0.6)' >Places</Text>
            <Text fontSize='6xl' fontFamily='Sharp Grotesk 25' lineHeight='80%' letterSpacing='-1px' mt='-70px' transform='scale(1,0.6)' >Walk and explore the world in photogrammetry!</Text>
          </Box>

        </GridItem>
        <GridItem rowSpan={2} colSpan={2} position='relative'>
          <PlacesRuntimeDemo DemoModel={() => <Model />} />
        </GridItem>
        <GridItem className='custom-bg' colSpan={2} position='relative'>
          <Box position='absolute' top='50%' left='0' right='0'>
            <Center>
              <Button colorScheme='yellow' >
                Enter to Places Creator
              </Button>
            </Center>
          </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
