import React, { Suspense, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import './App.css'
import { GridItem, ChakraProvider, Flex, Grid, Text, Box, Image, Button, Center } from '@chakra-ui/react'
import { Environment, Gltf, OrbitControls, PerspectiveCamera, Plane, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Model } from './model';
import {
  Debug,
  useBox,
  usePlane,
  useSphere,
  useTrimesh,
  useCylinder,
  useConvexPolyhedron,
} from '@react-three/cannon'
import { useControls } from 'leva'
import { Geometry } from "three-stdlib";
import { BoxGeometry, EdgesGeometry, Ray, Raycaster, Vector3 } from 'three';
import * as BufferGeometryUtilts from './modules/BufferGeometryUtilts.js'
import { MeshCollider, Physics, RigidBody } from '@react-three/rapier'

function App() {
  function toConvexProps(bufferGeometry: any) {
    const geo = new Geometry().fromBufferGeometry(bufferGeometry)
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    geo.mergeVertices()
    return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]
  }


  const usePersonControls = () => {
    const keys = {
      KeyW: 'forward',
      KeyS: 'backward',
      KeyA: 'left',
      KeyD: 'right',
      Space: 'up',
      ShiftLeft: 'down',
    }

    const moveFieldByKey = (key: "KeyW" |
      "KeyS" |
      "KeyA" |
      "KeyD" |
      "ShiftLeft" |
      "Space") => keys[key]

    const [movement, setMovement] = useState({
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
    })

    useEffect(() => {
      const handleKeyDown = (e: any) => {
        setMovement((m: any) => ({ ...m, [moveFieldByKey(e.code)]: true }))
      }
      const handleKeyUp = (e: any) => {
        setMovement((m: any) => ({ ...m, [moveFieldByKey(e.code)]: false }))
      }
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
      }
    }, [])
    return movement
  }




  function Cube({ position, rotation, size }: any) {
    const { forward, backward, left, right, up, down } = usePersonControls()

    const cubeRef = useRef() as any
    useFrame(() => {
      // Calculating front/side movement ...
      // let frontVector = new Vector3(0, 0, 0);
      // let sideVector = new Vector3(0, 0, 0);
      // let direction = new Vector3(0, 0, 0);

      // frontVector.set(0, 0, Number(forward) - Number(backward))
      // sideVector.set(Number(right) - Number(left), 0, 0)
      // direction
      //   .subVectors(frontVector, sideVector)
      //   .normalize()
      //   .multiplyScalar(10)

      if (left) {
        cubeRef.current.position.x += 0.1
      }
      if (right) {
        cubeRef.current.position.x -= 0.1
      }
      if (backward) {
        cubeRef.current.position.z -= 0.1
      }
      if (forward) {
        cubeRef.current.position.z += 0.1
      }
      if (up) {
        cubeRef.current.position.y += 0.1
      }
      if (down) {
        cubeRef.current.position.y -= 0.1
      }
    })

    return (
      <mesh position={position} ref={cubeRef as any}>
      <boxGeometry args={[size, size, size]} />
      <meshPhysicalMaterial color="rebeccapurple" />
    </mesh>
    )
  }

  function PhyPlane({ color, ...props }: any) {
    const [ref] = usePlane(() => ({ ...props }));

    return (
      <Plane args={props.args} ref={ref as any}>
        <meshStandardMaterial color={color} />
      </Plane>
    );
  }

  function Place(props: any) {
    const { nodes, materials } = useGLTF("/freeman_alley_dataset.glb");
    const merged = BufferGeometryUtilts.mergeGeometries([ //@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u1_v1_0"].geometry, //@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u1_v1_0_1"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u1_v1_0_2"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u1_v1_0_3"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u1_v1_0_4"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u2_v1_0"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u2_v1_0_1"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u2_v1_0_2"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u2_v1_0_3"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u1_v2_0"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u1_v2_0_1"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u1_v2_0_2"].geometry,//@ts-ignore
      nodes["0727_FREEMAN_ALLEY_0727_FREEMAN_ALLEY_u1_v2_0_3"].geometry,
    ])
    return (
      <group
        position={[3.187, -5.692, 0.504]}
        rotation={[-1.594, 1.382, -0.259]}
        scale={0.87}
      >
        <group rotation={[-Math.PI, 0, 0]}>
          <MeshCollider type={'trimesh'}>
          <mesh castShadow receiveShadow geometry={merged}>
            <meshStandardMaterial wireframe color="pink" />
          </mesh>
          </MeshCollider>
          
        </group>

      </group>
   )
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
              

                <RigidBody>
                <Cube position={[0, 0, 4]} rotation={[0.5, 0.4, -1]} size={0.4} />
             
                </RigidBody>
                <RigidBody type='fixed' colliders='hull'>
                <Place />
                </RigidBody>
                   
              </Physics>


              {/* <Cube position={[0, 0, 4]} rotation={[0.5, 0.4, -1]} size={0.4} /> */}
              {/* <PhyPlane
                  color="hotpink"
                  position={[0, -8.3, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  args={[1000, 1000]}
                /> */}
              {/* <PhyPlane color="lightblue" position={[0, 0, -37]} args={[1000, 1000]} />
                <PhyPlane color="lightgreen" position={[0.7, -4, -10.6]} rotation={[0, -Math.PI / 2, 0]} args={[22.7, 10]} />
                <PhyPlane color="lightgreen" position={[-2.6, -4, -10.6]} rotation={[0, Math.PI / 2, 0]} args={[22.7, 10]} />
                <PhyPlane color="lightgreen" position={[-2.6, -4, -21.6]} rotation={[0, 0, -Math.PI / 2]} args={[22.7, 10]} /> */}

              {/* <Place /> */}

              {/* <Model /> */}


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
