import { Box, Button, Center, Grid, GridItem, Link, Text } from '@chakra-ui/react'
import { IconBackhoe, IconBrandGithubFilled } from '@tabler/icons-react'
import React from 'react'
import { PlacesRuntimeDemo } from '../components/places-demo-runtime'
import { Model } from '../components/places-demo-runtime/place-demo-model'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'

export function Home() {
    const navigate = useNavigate();

    return (<Grid
        h='100vh'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={1}
    >
        <GridItem colSpan={2} bg='linear-gradient(170deg, rgba(170,255,214,1) 0%, rgba(176,242,255,1) 50%, rgba(255,130,172,1) 100%)' position='relative'>
            <Box position='absolute' left='15%' top='20%' color='#1a1a1a'>
                <Text fontSize='130pt' fontFamily='Sharp Grotesk 25' fontWeight='900' letterSpacing='-8px' transform='scale(1,0.6)'>Places</Text>
                <Text fontSize='6xl' fontFamily='Sharp Grotesk 25' lineHeight='80%' letterSpacing='-1px' mt='-70px' transform='scale(1,0.6)'>Walk and explore the world by using photogrammetry!</Text>
                <Link><IconBrandGithubFilled /></Link>
            </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} position='relative'>
            <PlacesRuntimeDemo DemoModel={() => <Model />} />
        </GridItem>
        <GridItem className='custom-bg' colSpan={2} position='relative' textAlign='center'>
            <Box position='absolute' top='50%' left='0' right='0'>
                <Center>
                    <Tooltip id="enter-places-creator" place="top" style={{ backgroundColor: '#ffcc00' }}>
                        <Text float='left' as='b' pr='5px'>Working in progress</Text> <IconBackhoe />
                    </Tooltip>
                    <Button onClick={() => navigate('places-creator')} data-tooltip-id='enter-places-creator' bg='#003566' color='white' _hover={{ backgroundColor: '#001a33' }}>
                        Go to Places Creator
                    </Button>
                </Center>
            </Box>
        </GridItem>
    </Grid>)
}