import {
    Box,
    Button,
    VStack,
    Text,
    Divider,
    Input,
    FormLabel,
    Switch,
} from '@chakra-ui/react'
import { Canvas } from '@react-three/fiber'
import { useFormik, } from 'formik'
import { useCallback, useContext, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from '@react-three/drei'
import { REVISION, Vector3, WebGLRenderer } from 'three'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { Vector3Array } from '@react-three/rapier'


interface PlacesRuntimeSettings {
    Model: any,
    playerSpeed: number,
    gravity: Vector3Array,
    playerPosition: Vector3,
    title: string,
    day: boolean,
}

export const PlacesRuntimeContext = React.createContext({
    placesRuntimeSettings: null,
    setPlacesRuntimeSettings: (s: PlacesRuntimeSettings) => { }
});

let gltfLoader
if (typeof window !== 'undefined') {
    const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`
    const dracoloader = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/')
    const ktx2Loader = new KTX2Loader().setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`)

    gltfLoader = new GLTFLoader()
        .setCrossOrigin('anonymous')
        .setDRACOLoader(dracoloader)
        .setKTX2Loader(ktx2Loader.detectSupport(new WebGLRenderer()))
        .setMeshoptDecoder(MeshoptDecoder)
}

export function PlacesCreator({ startScene }) {
    const primitiveRef = useRef() as any

    const orbitRef = useRef() as any
    const { setPlacesRuntimeSettings } = useContext(PlacesRuntimeContext);
    const [scene, setScene] = useState<any>(startScene)
    const [title, setTitle] = useState<any>('New York, Freeman Alley')
    const navigator = useNavigate()

    const onDrop = useCallback(async (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.error('file reading was aborted')
            reader.onerror = () => console.error('file reading has failed')
            reader.onload = async (evt) => {
                const result = await new Promise((resolve, reject) => gltfLoader.parse(evt.target.result, '', resolve, reject)) as any
                setTitle(result.asset.extras.title)
                setScene(result.scene)
            };
            reader.readAsArrayBuffer(file)
        })
    }, [])

    function handleRunOnPlacesRuntime() {
        setPlacesRuntimeSettings({
            Model: () => <primitive object={scene} />,
            playerSpeed: formik.values.playerSpeed,
            gravity: [formik.values.gravityX, formik.values.gravityY, formik.values.gravityZ],
            playerPosition: new Vector3(formik.values.playerX, formik.values.playerY, formik.values.playerZ),
            day: formik.values.day ? true : false,
            title,
        })
        navigator('/places-runtime')
    }

    const formik = useFormik({
        initialValues: {
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            playerX: -5.303398132324219,
            playerY: -6,
            playerZ: -28.87546730041504,
            playerSpeed: 5,
            gravityX: 0,
            gravityY: -20,
            gravityZ: 0,
            day: 'true',
        },
        onSubmit: (e) => { console.log(e) }
    });
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
    });

    return (
        <><Box w='100vw' h='100vh' className='places-creator'>

            <Box
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'white',

                    },
                }}
                style={{ zIndex: 999 }}
                position="fixed"
                left={0}
                p={5}
                w="400px"
                top={0}
                h="100%"
                color='white'
                bg="blue"
                overflowY='scroll'
            >
                <VStack >
                    <Text fontSize='40pt' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-4px' transform='scale(1,0.6)'>Places Creator</Text>
                    <Text fontSize='10pt' mt='-30px'>v1.0</Text>
                    <form onSubmit={formik.handleSubmit}>
                        <Text fontSize='3xl'>Model</Text>
                        <Divider />
                        <Box mt='20px' textAlign='center' w='100%' h='100px' borderStyle='dashed' borderColor='#f2f2f2' borderWidth='2px' {...getRootProps({ className: 'dropzone' })}>
                            <Box>
                                <input {...getInputProps()} />
                                <Text pt='35px'>Drag 'n' drop .glTF or .GLB file, or click to select</Text>
                            </Box>
                        </Box>
                        <FormLabel mt='20px'>Scale</FormLabel>
                        <Input
                            w='31%'
                            placeholder='x'
                            size='sm'
                            name="scaleX"
                            type='number'
                            value={formik.values.scaleX}
                            onChange={(e) => {
                                primitiveRef.current.scale.x = e.target.value
                                formik.handleChange(e)
                            }}
                        />

                        <Input
                            w='31%'
                            placeholder='y'
                            size='sm'
                            ml='10px'
                            name="scaleY"
                            type='number'
                            value={formik.values.scaleY}
                            onChange={(e) => {
                                primitiveRef.current.scale.y = e.target.value
                                formik.handleChange(e)
                            }}
                        />
                        <Input
                            w='31%'
                            placeholder='z'
                            size='sm'
                            ml='10px'
                            name="scaleZ"
                            type='number'
                            value={formik.values.scaleZ}
                            onChange={(e) => {
                                primitiveRef.current.scale.z = e.target.value
                                formik.handleChange(e)
                            }}
                        />

                        <Text mt='20px' fontSize='3xl'>Player</Text>
                        <Divider />
                        <FormLabel mt='20px'>Start Position</FormLabel>
                        <Input
                            w='31%'
                            placeholder='x'
                            size='sm'
                            name="playerX"
                            type='number'
                            value={formik.values.playerX}
                            onChange={formik.handleChange}
                        />
                        <Input
                            w='31%'
                            placeholder='y'
                            size='sm'
                            ml='10px'
                            name="playerY"
                            type='number'
                            value={formik.values.playerY}
                            onChange={formik.handleChange}
                        />
                        <Input
                            w='31%'
                            placeholder='z'
                            size='sm'
                            ml='10px'
                            name="playerZ"
                            type='number'
                            value={formik.values.playerZ}
                            onChange={formik.handleChange}
                        />

                        <Button mt='10px' size='sm' onClick={() => {
                            const vec = orbitRef.current.object.position
                            formik.setFieldValue('playerX', vec.x)
                            formik.setFieldValue('playerY', vec.y)
                            formik.setFieldValue('playerZ', vec.z)
                        }}>Use camera position</Button>
                        <FormLabel mt='20px'>Speed</FormLabel>
                        <Input
                            placeholder=''
                            size='sm'
                            type='number'
                            name='playerSpeed'
                            value={formik.values.playerSpeed}
                            onChange={formik.handleChange}
                        />
                        <Text mt='20px' fontSize='3xl'>Physics</Text>
                        <Divider />
                        <FormLabel mt='20px'>Gravity</FormLabel>
                        <Input
                            w='31%'
                            placeholder='x'
                            size='sm'
                            name="gravityX"
                            type='number'
                            value={formik.values.gravityX}
                            onChange={formik.handleChange}
                        />
                        <Input
                            w='31%'
                            placeholder='y'
                            size='sm'
                            ml='10px'
                            name="gravityY"
                            type='number'
                            value={formik.values.gravityY}
                            onChange={formik.handleChange}
                        />
                        <Input
                            w='31%'
                            placeholder='z'
                            size='sm'
                            ml='10px'
                            name="gravityZ"
                            type='number'
                            value={formik.values.gravityZ}
                            onChange={formik.handleChange}
                        />

                        <Text mt='20px' fontSize='3xl'>Atmosphere</Text>
                        <Divider />
                        <FormLabel mt='20px'>Day</FormLabel>
                        <Switch name='day' defaultChecked value={formik.values.day} onChange={formik.handleChange} />
                    </form>
                </VStack >
            </Box>

            <Canvas>
                <primitive object={scene} ref={primitiveRef} />
                <OrbitControls ref={orbitRef} />
            </Canvas>


            <Box position='absolute' bottom='2' right='2'>
                <Box onClick={handleRunOnPlacesRuntime} cursor='pointer' w='200px' h='150px' bg='black' textAlign='center' color='white'>
                    Go to <Text fontSize='28pt' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-2px' transform='scale(1,0.7)'>Places Runtime</Text>
                </Box>
            </Box>
        </Box>



        </>
    )
}