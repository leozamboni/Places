import React from 'react';
import './App.css';
import '@radix-ui/themes/styles.css';
import { Flex, Text, Button, Theme, ThemePanel, Grid, Box, } from '@radix-ui/themes';

function App() {
  return (
    <Grid columns="2" gap="3">
      <Flex className='h-2/4' direction="column" gap="3">
        <Box className='bg-slate-400 h-full p-32'>
          <Text className='text-8xl font-dmserif'>Travel to</Text>
          <br />
          <Text className='text-7xl ml-40 font-dmserif italic'>anywhere<br />anytime</Text>
        </Box>
      </Flex>

      <Flex direction="column" gap="3">
        <Box className='h-screen'>
          <div className='bg-slate-400 h-full'>Travel to</div>
        </Box>
      </Flex>
    </Grid>

  );
}

export default App;
