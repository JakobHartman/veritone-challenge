import React from 'react';
import logo from './logo.svg';
import Box from '@mui/material/Box';
import './App.css';
import { AppBar, Button, Container, Icon, Stack, Toolbar, Typography } from '@mui/material';
import UseShoppingList from './components/hooks/useShoppingList';
import { styles } from './styles'

function App() {
  
  const {shoppingList} = UseShoppingList();

  function handleAddItem(){

  }

  return (
    <Stack>
      <AppBar position='sticky' sx={styles.appBar}>
        <Toolbar variant='dense'>
          <Icon>

          </Icon>
          <Typography>
            Shopping List
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={styles.main}> 
      {
        shoppingList.length < 1 && (
          <Stack maxWidth="sm" sx={styles.noList}>
            <Typography>
              Your shopping list is empty :(
            </Typography>
            <Button variant='contained' sx={styles.addButton}>Add your first Item</Button>
          </Stack>
        )
      }
    </Container>
  </Stack>
  );
}

export default App;
