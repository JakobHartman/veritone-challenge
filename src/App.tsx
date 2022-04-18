import { useState } from 'react';
import { AppBar, 
  Button, 
  Checkbox, 
  Container, 
  Icon, 
  IconButton, 
  List, 
  ListItem, 
  Stack, 
  Toolbar, 
  Grid,
  Typography } from '@mui/material';
import './App.css';
import UseShoppingList from './components/hooks/useShoppingList';
import { styles } from './styles'
import ShoppingDrawer, { DrawerType } from './components/views/ShoppingDrawer';
import { Item } from './types';
import DeleteDialogView from './components/views/DeleteDialogView';

function App() {
  const [isOpen, setOpen] = useState(false)
  const {shoppingList, addToShoppingList, removeFromShoppingList, overwriteItem} = UseShoppingList();
  const [editing, setEditing] = useState<Item | undefined>(undefined);
  const [drawerType, setDrawerType] = useState(DrawerType.ADD);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleting, setDeleteing] = useState("");

  const handleCheckItem = (event: any) => {
    const found = shoppingList.find((item) => { 
      return item.id === event.target.id;
    });
    if(found){
      found.isChecked = event.target.checked;
      overwriteItem(found)
    }
  }

  const handleDeleteItem = (event: any) => {
    setIsDeleting(true);
    setDeleteing(event.target.id);
  }

  const handleCancelDelete = () => {
    setIsDeleting(false);
    setDeleteing("");
  }

  const handleEdit = (event: any) => {
    const found = shoppingList.find((item) => { 
      return item.id === event.target.id
    });
    setDrawerType(DrawerType.EDIT);
    setEditing(found)
    onOpen()
  }

  const handleChange = (item:Item) => {
    switch(drawerType){
      case DrawerType.ADD:
        return addToShoppingList(item);
      case DrawerType.EDIT:
        return overwriteItem(item);
    }
  }

  const handleAdd = () => {
      setDrawerType(DrawerType.ADD);
      setEditing(undefined);
      onOpen();
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
      <Container maxWidth="lg" sx={styles.main}> 
      {
        shoppingList.length < 1 && (
          <Stack maxWidth="lg" sx={styles.noList}>
            <Typography>
              Your shopping list is empty :(
            </Typography>
            <Button onClick={handleAdd} variant='contained' sx={styles.addButton}>Add your first Item</Button>
          </Stack>
        )
      }
      {
        shoppingList.length > 0 && (
          <Container  disableGutters>
            <Grid container>
              <Grid item xs={10} >
                <Typography variant='h4'>Your Items</Typography>
              </Grid>
              <Grid item xs={2} >
                <Button variant='contained' onClick={handleAdd} sx={{ml: 11}}>Add Item</Button>
              </Grid>
              
            </Grid>
            
            <List>
              {shoppingList.map( item => (
                <ListItem key={item.id} sx={styles.listItem}>
                  <Checkbox checked={item.isChecked} onChange={handleCheckItem} id={item.id}/>
                  <Stack>
                    <Typography >{item.name}</Typography>
                    <Typography variant='subtitle2'>{item.description}</Typography>
                  </Stack>
                  <Grid container justifyContent="flex-end">
                    <IconButton edge="end" onClick={handleEdit}>
                      <span className="material-icons" id={item.id} >edit</span>
                    </IconButton>
                    <IconButton edge="end" onClick={handleDeleteItem}>
                      <span className="material-icons" id={item.id} >delete</span>
                    </IconButton>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Container>
        )
      }
    </Container>
    <ShoppingDrawer 
      onClose={onClose} 
      onOpen={onOpen} 
      isOpen={isOpen}  
      type={drawerType}
      item={editing}
      handleChange={handleChange}/>

    <DeleteDialogView 
      open={isDeleting} 
      handleClose={handleCancelDelete} 
      handleConfirm={(id: string) => {
        setDrawerType(DrawerType.ADD);
        setEditing(undefined);
        setIsDeleting(false);
        removeFromShoppingList(id);
      }} 
      itemID={deleting}/>  
  </Stack>
  );
}

export default App;
