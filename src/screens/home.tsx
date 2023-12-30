import { Box, Button, Center, Grid, GridItem, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { IconAlertTriangleFilled, IconBackhoe, IconBrandGithubFilled } from '@tabler/icons-react'
import React, { useState } from 'react'
import { PlacesRuntimeDemo } from '../components/places-demo-runtime'
import { Model } from '../components/places-demo-runtime/place-demo-model'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'

export function Home() {
    const [modalOpen, setModalOpen] = useState(true)
    const navigate = useNavigate();

    return (<><Grid
        h='100vh'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={1}
    >
        <GridItem colSpan={2} bg='linear-gradient(166deg, rgba(255,230,115,1) 0%, rgba(255,196,0,1) 100%)' position='relative'>
            <Box position='absolute' left='15%' top='20%' color='#1a1a1a'>
                <Text fontSize='130pt' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-12px' transform='scale(1,0.5)'>Places</Text>
                <Text fontSize='6xl' fontFamily='Sharp Grotesk 25' lineHeight='80%' letterSpacing='-1px' mt='-70px' transform='scale(1,0.6)'>Walk and explore the world by using photogrammetry!</Text>
                <Link href='https://github.com/leozamboni/Places'><IconBrandGithubFilled /></Link>
            </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} position='relative'>
            <PlacesRuntimeDemo DemoModel={() => <Model />} />
        </GridItem>
        <GridItem className='custom-bg' colSpan={2} position='relative' textAlign='center'>
            <Box position='absolute' top='50%' left='0' right='0'>
                <Center>
                    <Tooltip id="enter-places-creator" place="top" style={{ backgroundColor: 'orange', color: 'black' }}>
                        <Text float='left' as='b' pr='5px'>Working in progress</Text> <IconBackhoe />
                    </Tooltip>
                    <Button onClick={() => navigate('places-creator')} data-tooltip-id='enter-places-creator' bg='blue' color='white' _hover={{ backgroundColor: 'darkblue' }}>
                        Go to Places Creator
                    </Button>
                </Center>
            </Box>
        </GridItem>
    </Grid>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} >
            <ModalOverlay />
            <ModalContent bg='orange' color='black'>
                <ModalHeader >

                    <IconAlertTriangleFilled style={{ float: 'left', marginRight: '10px' }} /> Warning</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Places, like any other 3D tool, uses a lot of processing for renderings, if you don't have appropriate hardware maybe you will have problems with just a few frames per second.</Text>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={() => setModalOpen(false)}>
                    Ok
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal></>
    )
}