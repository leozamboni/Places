import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Center, Divider, Text } from "@chakra-ui/react";
import { KeyboardControls, PointerLockControls, useKeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Player } from "./player";
import { Model } from "./place-demo-model";
import { IconMouse, IconRectangle, IconSpace, IconSquareArrowDown, IconSquareArrowLeft, IconSquareArrowRight, IconSquareArrowUp, IconSquareLetterA, IconSquareLetterD, IconSquareLetterS, IconSquareLetterW } from '@tabler/icons-react';
import { Audio, RotatingLines } from "react-loader-spinner";

export function PlacesRuntimeDemo({ pointerLockControlsRef }: any) {
    const [showInstructions, setShowInstructions] = useState(true)

    function pointerlockchange() {
        setShowInstructions(!showInstructions)
    }

    useEffect(() => {
        document.addEventListener('pointerlockchange', pointerlockchange, false)
        return () => {
            document.removeEventListener('pointerlockchange', pointerlockchange, false)
        }
    })

    function Loading() {
        return (
            <Box position='absolute' left='50%' top='50%' transform='translate(-50%, -50%)'>
                <RotatingLines
                    strokeColor="yellow"
                    visible={true}
                    width="96"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />
            </Box>
        )
    }

    return (
        <Box w='100%' h='100%' >
            {showInstructions && (
                <Box position='absolute' zIndex={1} bg='rgba(0, 0, 0, 0.32)' w='100%' h='100%' textAlign='center' color='blue.50'>
                    <Box position='absolute' margin={0} w='100%' top='15%'>
                        <Text fontSize='6xl' fontFamily='Adobe Text Pro Semibold' transform='scale(1,0.7)' >Places demo runtime</Text>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Button id="button">Click to start</Button>
                    </Box>
                    <Box left={0} right={0} margin='auto' position='absolute' bottom='40' w='100%'>
                        Eyes on
                        <IconMouse style={{ margin: 'auto' }} />
                        <br />
                        How to feet? Use
                        <br />
                        <br />
                        <Box display='flex' margin='auto' w='50%' h='100%' >
                            <Box flex='1' h='100%' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
                                <IconSquareLetterW />
                                <Box display='inline-block'  >
                                    <IconSquareLetterA style={{ float: 'left' }} />
                                    <IconSquareLetterS style={{ float: 'left' }} />
                                    <IconSquareLetterD style={{ float: 'left' }} />
                                </Box>
                            </Box>

                            <Center flex='1' height='50px'>
                                <Divider orientation='vertical' />
                            </Center>

                            <Box flex='1' h='100%' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
                                <IconSquareArrowUp />
                                <Box display='inline-block'  >
                                    <IconSquareArrowLeft style={{ float: 'left' }} />
                                    <IconSquareArrowDown style={{ float: 'left' }} />
                                    <IconSquareArrowRight style={{ float: 'left' }} />
                                </Box>
                            </Box>
                        </Box>
                        <br />
                        and jump with
                        <IconSpace style={{ margin: 'auto' }} />
                    </Box>
                </Box>
            )}
            <Box left={0} right={0} margin='auto' color='blue.50' zIndex={2} textAlign='center' position='absolute' bottom='0' w='100%'>
                New York, Freeman Alley. Places demo runtime v1.0.
            </Box>

            <KeyboardControls
                map={[
                    { name: "forward", keys: ["ArrowUp", "w", "W"] },
                    { name: "backward", keys: ["ArrowDown", "s", "S"] },
                    { name: "left", keys: ["ArrowLeft", "a", "A"] },
                    { name: "right", keys: ["ArrowRight", "d", "D"] },
                    { name: "jump", keys: ["Space"] },
                    { name: "esc", keys: ["Esc"] },
                ]}>
                <Suspense fallback={<Loading />}>
                    <Canvas >

                        <Physics gravity={[0, -20, 0]}>
                            <Player position={[-5.303398132324219, -6, -28.87546730041504]} />
                            <Model />
                        </Physics>
                        <PointerLockControls selector="#button"/>
                        <ambientLight intensity={2} />
                        <pointLight intensity={0.8} position={[5, 0, 5]} />



                    </Canvas>
                </Suspense>

            </KeyboardControls>
        </Box>
    )
}