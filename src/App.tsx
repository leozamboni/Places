import React, { Suspense, useRef } from 'react';
import './App.css'
import { GridItem, ChakraProvider, Grid, Text, Box, Image, Button, Center } from '@chakra-ui/react'
import { useKeyboardControls, KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Model } from './model';
import { Vector3 } from 'three';
import * as RAPIER from "@dimforge/rapier3d-compat"
import { CapsuleCollider, MeshCollider, Physics, RigidBody, useRapier } from '@react-three/rapier'
import { Player } from './components/player';

function App() {
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
            <Text fontSize='8xl' fontFamily='Adobe Text Pro Semibold'>Places;</Text>
            <Text fontSize='5xl' fontFamily='Adobe Text Pro'>Walk and explore the world in photogrammetry!</Text>
          </Box>

        </GridItem>
        <GridItem rowSpan={2} colSpan={2} >

          <KeyboardControls
            map={[
              { name: "forward", keys: ["ArrowUp", "w", "W"] },
              { name: "backward", keys: ["ArrowDown", "s", "S"] },
              { name: "left", keys: ["ArrowLeft", "a", "A"] },
              { name: "right", keys: ["ArrowRight", "d", "D"] },
              { name: "jump", keys: ["Space"] },
            ]}>
            <Canvas >
              <Suspense fallback={null}>
                <Physics gravity={[0, -20, 0]}>


                  <Player />
                  <RigidBody type='fixed' colliders='hull'>
                    <MeshCollider type={'trimesh'}>
                      <Model />
                    </MeshCollider>
                  </RigidBody>

                </Physics>
                <PointerLockControls />
                <ambientLight intensity={2} />
                <pointLight intensity={0.8} position={[5, 0, 5]} />
              </Suspense>
            </Canvas>
          </KeyboardControls>

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
