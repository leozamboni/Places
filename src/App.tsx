import React, { Suspense, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import './App.css'
import { GridItem, ChakraProvider, Flex, Grid, Text, Box, Image, Button, Center } from '@chakra-ui/react'
import { Environment, Gltf, OrbitControls, PerspectiveCamera, Plane, useGLTF, useKeyboardControls, KeyboardControls, PointerLockControls } from '@react-three/drei'
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
import { CapsuleCollider, MeshCollider, Physics, RigidBody, useRapier } from '@react-three/rapier'

function App() {
  const SPEED = 5
  const direction = new Vector3()
  const frontVector = new Vector3()
  const sideVector = new Vector3()
  const rotation = new Vector3()

  function Cube({ position, rotation, size }: any) {
    const ref = useRef() as any
    const [, get] = useKeyboardControls()
    const rapier = useRapier()
    const { camera } = useThree()

    useFrame(() => {
      const { forward, backward, left, right, jump } = get()
      const velocity = ref.current.linvel()

      // update camera
      let p = ref.current.translation()
      camera.position.set(p.x, p.y, p.z)

      // movement
      frontVector.set(0, 0, Number(backward) - Number(forward))
      sideVector.set(Number(left) - Number(right), 0, 0)
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
      ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

      // // jumping
      // //@ts-ignore
      // const world = rapier.world.raw()
      // //@ts-ignore
      // const ray = world.castRay(new rapier.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }))
      // const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
      // if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 })
    })

    return (
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]}>

          <boxGeometry args={[size, size, size]} />
          <meshPhysicalMaterial color="rebeccapurple" />
        </CapsuleCollider>
      </RigidBody>
      // <RigidBody mass={1} type="dynamic">
      //   <mesh position={position} ref={cubeRef as any}>
      //     <boxGeometry args={[size, size, size]} />
      //     <meshPhysicalMaterial color="rebeccapurple" />
      //   </mesh>
      // </RigidBody>

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
                <Physics>


                  <Cube position={[0, 0, 4]} rotation={[0.5, 0.4, -1]} size={0.4} />
                  <RigidBody type='fixed' colliders='hull'>
                    <Place />
                  </RigidBody>

                </Physics>
                <PointerLockControls />

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
                {/* <PerspectiveCamera makeDefault position={[-5, -6, -33]} fov={45} />
                <OrbitControls /> */}

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
