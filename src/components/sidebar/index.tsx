import {
    Box,
    Button,
    VStack,
    Text,
    Divider,
    Input,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik'
import { CSSProperties, MouseEventHandler, ReactComponentElement } from 'react'
import { useDropzone } from 'react-dropzone'


export type navigationT = 'drawer' | 'sidebar'

interface Props {
    SidebarContent: () => any
    style?: CSSProperties
}

export function Sidebar({ style, SidebarContent }: Props) {
    return (<Box
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
        style={style}
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
        <SidebarContent />
    </Box>)
}

