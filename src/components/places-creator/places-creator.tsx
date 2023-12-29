import {
    Box,
    Button,
    VStack,
    Text,
    Divider,
    Input,
    FormControl,
    FormLabel,
    useBreakpointValue,
} from '@chakra-ui/react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik'
import { CSSProperties, MouseEventHandler, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { GLTFLoader } from 'three-stdlib'
import { Sidebar } from '../sidebar'
import { OrbitControls } from '@react-three/drei'


export type navigationT = 'drawer' | 'sidebar'

interface Props {
    onClose: () => void
    isOpen: boolean
    variant: navigationT
    style?: CSSProperties
}


type variantT = { navigation: navigationT, navigationButton: boolean }

const smVariant: variantT = { navigation: 'drawer', navigationButton: true }
const mdVariant: variantT = { navigation: 'sidebar', navigationButton: false }

export function PlacesCreator() {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant })
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    function Scene() {
        const gltf = useLoader(GLTFLoader, '/freeman_alley_dataset.glb')
        return <primitive object={gltf.scene} scale={[1, 1, 1]} />
    }


    function sideBarForm() {
        return (
            <VStack >
                <Text fontSize='40pt' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-4px' transform='scale(1,0.6)'>Places Creator</Text>
                <Text fontSize='10pt' mt='-30px'>v1.0</Text>

                <Formik
                    initialValues={{
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
                    }}
                    onSubmit={function (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>): void | Promise<any> {
                        throw new Error('Function not implemented.')
                    }}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <Form>
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
                                value={values.scaleX}
                                onChange={handleChange}
                            />

                            <Input
                                w='31%'
                                placeholder='y'
                                size='sm'
                                ml='10px'
                                name="scaleY"
                                type='number'
                                value={values.scaleY}
                                onChange={handleChange}
                            />
                            <Input
                                w='31%'
                                placeholder='z'
                                size='sm'
                                ml='10px'
                                name="scaleZ"
                                type='number'
                                value={values.scaleZ}
                                onChange={handleChange}
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
                                value={values.playerX}
                                onChange={handleChange}
                            />
                            <Input
                                w='31%'
                                placeholder='y'
                                size='sm'
                                ml='10px'
                                name="playerY"
                                type='number'
                                value={values.playerY}
                                onChange={handleChange}
                            />
                            <Input
                                w='31%'
                                placeholder='z'
                                size='sm'
                                ml='10px'
                                name="playerZ"
                                type='number'
                                value={values.playerZ}
                                onChange={handleChange}
                            />

                            <Button mt='10px' size='sm'>Set from current camera position</Button>
                            <FormLabel mt='20px'>Speed</FormLabel>
                            <Input
                                placeholder=''
                                size='sm'
                                type='number'
                                name='playerSpeed'
                                value={values.playerSpeed}
                                onChange={handleChange}
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
                                value={values.gravityX}
                                onChange={handleChange}
                            />
                            <Input
                                w='31%'
                                placeholder='y'
                                size='sm'
                                ml='10px'
                                name="gravityY"
                                type='number'
                                value={values.gravityY}
                                onChange={handleChange}
                            />
                            <Input
                                w='31%'
                                placeholder='z'
                                size='sm'
                                ml='10px'
                                name="gravityZ"
                                type='number'
                                value={values.gravityZ}
                                onChange={handleChange}
                            />
                            <Divider mt='20px' />
                            <Box mt='20px' textAlign='right'>
                                <Button >Apply</Button>
                            </Box>
                        </Form>
                    )}

                </Formik>


            </VStack>)
    }


    return (<Box w='100vw' h='100vh' className='places-creator' >
        <Sidebar
            style={{ zIndex: 1 }}
            variant={variants?.navigation ?? 'sidebar'}
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
            SidebarContent={() => sideBarForm()} />
        <Canvas>
            <Scene />
            <OrbitControls />
        </Canvas>
        <Box position='absolute' bottom='2' right='2' >
            <Box w='400px' h='150px' display='flex'>
                <Box w='50%' bg='pink' h='100%' flex='1'></Box>
                <Box w='50%' bg='blue' h='100%' flex='1'>
                    <Button>Try on Places Runtime</Button>
                </Box>
            </Box>
        </Box>
    </Box>)
}