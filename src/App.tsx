import React, { useState } from 'react';
import logo from './logo.svg';
import Box from '@mui/material/Box';
import './App.css';
import { AppBar, Button, Container, Icon, Stack, SwipeableDrawer, TextareaAutosize, TextField, Toolbar, Typography } from '@mui/material';
import UseShoppingList from './components/hooks/useShoppingList';
import { styles } from './styles'
import ShoppingDrawer, { DrawerType } from './components/views/ShoppingDrawer';

function App() {
  const [isOpen, setOpen] = useState(false)
  const {shoppingList} = UseShoppingList();

  const handleAddItem = () => {

  }

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <Stack>
      <AppBar position='sticky' sx={styles.appBarMain}>
        <Toolbar variant='dense'>
          <Icon>

          </Icon>
          <Typography>
            SHOPPING LIST
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
            <Button onClick={onOpen} variant='contained' sx={styles.addButton}>Add your first Item</Button>
          </Stack>
        )
      }
    </Container>
    <ShoppingDrawer onClose={onClose} onOpen={onOpen} isOpen={isOpen}  type={DrawerType.ADD}/>
  </Stack>
  );
}

export default App;
