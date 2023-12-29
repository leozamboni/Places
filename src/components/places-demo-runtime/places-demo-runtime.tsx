import React, { Children } from "react";
import { Box } from "@chakra-ui/react";
import { KeyboardControls, PointerLockControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Player } from "../player";
import { PlacesDemoRuntimeHUD } from "./places-demo-runtime-hud";

export function PlacesRuntimeDemo({ DemoModel }: any) {
    return (
        <Box w='100%' h='100%' >
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
                        <Player position={[-5.303398132324219, -6, -28.87546730041504]} />
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