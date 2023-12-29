import { Box, Button, Center, Container, Divider, Text } from "@chakra-ui/react";
import { IconMouse, IconPlayerPause, IconPlayerPauseFilled, IconSpace, IconSquareArrowDown, IconSquareArrowLeft, IconSquareArrowRight, IconSquareArrowUp, IconSquareLetterA, IconSquareLetterD, IconSquareLetterS, IconSquareLetterW } from "@tabler/icons-react";
import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { DefaultLoadingManager } from "three";

type Props = {

}

export function PlacesDemoRuntimeHUD({ }: Props) {
    const [showInstructions, setShowInstructions] = useState(true)
    const [loadingStatus, setLoadingStatus] = useState('Loading started.')
    const [loading, setLoading] = useState(true)

    DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
        setLoadingStatus('Loaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    };

    DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
        setLoadingStatus('Loading files. ' + '\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    };

    DefaultLoadingManager.onError = function (url) {
        setLoadingStatus('There was an error loading ' + url)
    };

    DefaultLoadingManager.onLoad = function () {
        setLoadingStatus('Place loaded!')
        setLoading(false)
    };

    async function pointerlockchange() {
        setShowInstructions(!showInstructions)

        if (!showInstructions) {
            setLoading(true)
            await new Promise(
                resolve => setTimeout(resolve, 3000)
            );
            setLoading(false)
        }
    }

    useEffect(() => {
    }, [showInstructions])

    useEffect(() => {
        document.addEventListener('pointerlockchange', pointerlockchange, false)
        return () => {
            document.removeEventListener('pointerlockchange', pointerlockchange, false)
        }
    })

    return (
        <Box h='100%' w='100%' color='gray.100' position='absolute' zIndex={1}>
            <Box display={showInstructions ? 'initial' : 'none'} bg='rgba(0, 0, 0, 0.45)' position='absolute' textAlign='center' w='100%' h='100%' >
                <Box position='absolute' margin={0} w='100%' top='15%'>
                    <Text fontSize='6xl' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-2px' transform='scale(1,0.6)'>Places demo runtime</Text>
                    <Text>{loadingStatus}</Text>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button id={"button"} pointerEvents='auto' zIndex={loading ? -1 : 1} >
                        {loading ? (<RotatingLines
                            strokeColor="black"
                            visible={true}
                            width="30"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                        />) : 'Click to start'}
                    </Button>

                </Box>
                <Box left={0} right={0} margin='auto' position='absolute' bottom='40' w='100%'>
                    Eyes on
                    <IconMouse style={{ margin: 'auto' }} />
                    <br />
                    To explore use
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
                    and <Text as='b'>Space</Text> to jump
                    <IconSpace style={{ margin: 'auto' }} />
                    <br />
                    <Box w='220px' margin='auto'>
                        <IconPlayerPause style={{ float: 'left' }} />Return here with <Text as='b'>Esc</Text> key
                    </Box>
                </Box>
                <Box left={0} right={0} margin='auto' color='blue.50' textAlign='center' position='absolute' bottom='0' w='100%'>
                    New York, Freeman Alley. Places demo runtime v1.0.
                </Box>
            </Box>

            <Box display={showInstructions ? 'none' : 'initial'} position='absolute' textAlign='center' w='100%' h='100%'>
                <Box left={0} right={0} margin='auto' position='absolute' bottom='40' w='100%'>
                    <Box w='200px' margin='auto'>
                        <IconPlayerPause style={{ float: 'left' }} /> Pause with <Text as='b'>Esc</Text> key
                    </Box>
                </Box>

                <Box left={0} right={0} margin='auto' color='blue.50' textAlign='center' position='absolute' bottom='0' w='100%'>
                    New York, Freeman Alley. Places demo runtime v1.0.
                </Box>
            </Box>
        </Box>

    )
}