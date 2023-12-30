import { Box, Button, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import React, { Suspense, useState } from 'react'
import { Sidebar, navigationT } from '../components/sidebar'
import './style.css'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three-stdlib'
import { PlacesCreator } from '../components/places-creator/places-creator'
import { RotatingLines } from 'react-loader-spinner'

export function PlacesCreatorScreen() {

  return (
    <Suspense fallback={<RotatingLines strokeColor="black"
      visible={true}
      width="30"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />}>
      <PlacesCreator startScene={useLoader(GLTFLoader, '/freeman_alley_dataset.glb').scene} />
    </Suspense>

  )
}