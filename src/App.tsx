import React, { Suspense, useMemo, useRef } from 'react';
import './App.css'
import { GridItem, ChakraProvider, Flex, Grid, Text, Box, Image, Button, Center } from '@chakra-ui/react'
import { Environment, Gltf, OrbitControls, PerspectiveCamera, Plane, useGLTF } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Model } from './model';
import {
  Debug,
  Physics,
  useBox,
  usePlane,
  useSphere,
  useTrimesh,
  useCylinder,
  useConvexPolyhedron,
} from '@react-three/cannon'
import { useControls } from 'leva'
import { Geometry } from "three-stdlib";
import { BoxGeometry } from 'three';

function App() {

  function toConvexProps(bufferGeometry: any) {
    const geo = new Geometry().fromBufferGeometry(bufferGeometry);
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    geo.mergeVertices();
    return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
  }

  function Diamond(props: any) {
    const { nodes } = useGLTF("/freeman_alley_dataset.glb");
    console.log(nodes);

    //@ts-ignore
    const geo = useMemo(() => toConvexProps(nodes.Cylinder.geometry), [nodes]);
    const [ref] = useConvexPolyhedron(() => ({ mass: 100, ...props, args: geo }));
    return (
      <mesh
        castShadow
        receiveShadow
        ref={ref}
        //@ts-ignore
        geometry={nodes.Cylinder.geometry}
        {...props}
      >
        <meshStandardMaterial wireframe color="white" />
      </mesh>
    );
  }

  function Cube({ size, ...props }: any) {
    // note, this is wildly inefficient vs useBox
    const geo = useMemo(
      () => toConvexProps(new BoxGeometry(size, size, size)),
      []
    );
    const [ref] = useConvexPolyhedron(() => ({ mass: 100, ...props, args: geo }));
    return (
      <mesh castShadow receiveShadow ref={ref} {...props} geometry={geo}>
        <boxGeometry args={[size, size, size]} />
        <meshPhysicalMaterial color="rebeccapurple" />
      </mesh>
    );
  }

  function PhyPlane({ color, ...props }: any) {
    const [ref] = usePlane(() => ({ ...props }));

    return (
      <Plane args={[1000, 1000]} ref={ref as any}>
        <meshStandardMaterial color={color} />
      </Plane>
    );
  }

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

          <Canvas >
            <Suspense fallback={null}>

              <Physics>


                <Cube position={[0, 0, 0]} rotation={[0.5, 0.4, -1]} size={0.4} />
                {/* <Diamond position={[1, 5, 0]} rotation={[0.4, 0.1, 0.1]}/> */}
                <PhyPlane
                  color="hotpink"
                  position={[0, -2, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <PhyPlane color="lightblue" position={[0, 0, -10]} />
                <Model />

              </Physics>
              <ambientLight intensity={2} />
              <pointLight intensity={0.8} position={[5, 0, 5]} />
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
