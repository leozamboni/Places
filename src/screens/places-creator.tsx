import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

export function PlacesCreator() {
    return (<Grid
        h='100vh'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(2, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={2}  w='50%' bg='tomato' />
        <GridItem rowSpan={2}  bg='papayawhip' />
      </Grid>)
}