import { Box, Button, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Sidebar, navigationT } from '../components/sidebar'
import './style.css'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three-stdlib'
import { PlacesCreator } from '../components/places-creator/places-creator'

export function PlacesCreatorScreen() {

  return (
    <PlacesCreator/>
  )
}