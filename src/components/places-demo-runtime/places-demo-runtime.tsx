import React from "react";
import { Box } from "@chakra-ui/react";
import { KeyboardControls, PointerLockControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Player } from "../player";
import { PlacesDemoRuntimeHUD } from "./places-demo-runtime-hud";
import { Vector3 } from "three";

export function PlacesRuntimeDemo({ DemoModel }: any) {
    return (
        <Box w='100%' h='100%' bg='linear-gradient(166deg, rgba(255,251,240,1) 0%, rgba(122,194,255,1) 100%)'>
            <PlacesDemoRuntimeHUD />
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
                    <Physics gravity={[0, -20, 0]}>
                        <Player speed={5} position={new Vector3(-2.6042091846466064, -6, -21.494176864624023)} />
                        <DemoModel />
                    </Physics>

                    <PointerLockControls selector="#button" />
                    <ambientLight intensity={2} />
                    <pointLight intensity={0.8} position={[5, 0, 5]} />
                </Canvas>

            </KeyboardControls>
        </Box>
    )
}