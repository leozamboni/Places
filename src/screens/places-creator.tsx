import React, { Suspense } from 'react'
import './style.css'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'
import { PlacesCreator } from '../components/places-creator/places-creator'
import { RotatingLines } from 'react-loader-spinner'

export function PlacesCreatorScreen() {

  return (<PlacesCreator startScene={useLoader(GLTFLoader, process.env.REACT_APP_BASE_URL+'freeman_alley_dataset.glb').scene} />
  )
}