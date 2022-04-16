import React from 'react';
import logo from './logo.svg';
import Box from '@mui/material/Box';
import './App.css';
import { AppBar, Icon, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <Box>
        <AppBar>
          <Toolbar variant='dense'>
            <Icon>

            </Icon>
            <Typography>
              Shopping List
            </Typography>
          </Toolbar>
        </AppBar>
    </Box>
  );
}

export default App;
