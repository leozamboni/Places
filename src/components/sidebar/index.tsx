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
    onClose: () => void
    isOpen: boolean
    variant: navigationT
    SidebarContent: () => any
    style?: CSSProperties
}

export function Sidebar({ isOpen, variant, onClose, style, SidebarContent }: Props) {
    return (<Box
        style={style}
        position="fixed"
        left={0}
        p={5}
        w="400px"
        top={0}
        h="100%"
        color='#f2f2f2'
        bg="#003566"
        overflowY='scroll'
    >
        <SidebarContent />
    </Box>)
}

