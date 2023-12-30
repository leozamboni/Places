import React, { Children, useContext } from "react";
import { Box } from "@chakra-ui/react";
import { KeyboardControls, PointerLockControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MeshCollider, Physics, RigidBody, Vector3Array } from "@react-three/rapier";
import { Player } from "../player";
import { PlacesRuntimeHUD } from "./places-runtime-hud";
import { Vector3 } from "three";
import {  PlacesRuntimeContext } from "../places-creator";



export function PlacesRuntime() {
    const { placesRuntimeSettings } = useContext(PlacesRuntimeContext);
    return (
        <Box w='100vw' h='100vh' bg={placesRuntimeSettings.day ? 'linear-gradient(166deg, rgba(255,251,240,1) 0%, rgba(122,194,255,1) 100%)' : 'linear-gradient(166deg, rgba(41,38,30,1) 0%, rgba(5,0,27,1) 100%)'}>
            <PlacesRuntimeHUD title={placesRuntimeSettings.title} />
            <KeyboardControls
                map={[
                    { name: "forward", keys: ["ArrowUp", "w", "W"] },
                    { name: "backward", keys: ["ArrowDown", "s", "S"] },
                    { name: "left", keys: ["ArrowLeft", "a", "A"] },
                    { name: "right", keys: ["ArrowRight", "d", "D"] },
                    { name: "jump", keys: ["Space"] },
                    { name: "esc", keys: ["Esc"] },
                ]}>

                <Canvas >
                    <Physics gravity={placesRuntimeSettings.gravity}>
                        <Player speed={placesRuntimeSettings.playerSpeed} position={placesRuntimeSettings.playerPosition} />
                        <RigidBody type='fixed' colliders='hull'>
                            <MeshCollider type={'trimesh'}>
                                <placesRuntimeSettings.Model />
                            </MeshCollider>
                        </RigidBody>
                    </Physics>
                    <PointerLockControls selector="#button" />
                    <ambientLight intensity={2} />
                    <pointLight intensity={0.8} position={[5, 0, 5]} />
                </Canvas>

            </KeyboardControls>
        </Box>
    )
}