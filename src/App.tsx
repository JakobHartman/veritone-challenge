import { useState } from 'react';
import './App.css';
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
  Typography } from '@mui/material';
import UseShoppingList from './components/hooks/useShoppingList';
import { styles } from './styles'
import ShoppingDrawer, { DrawerType } from './components/views/ShoppingDrawer';
import { Item } from './types';

function App() {
  const [isOpenAdd, setOpenAdd] = useState(false)
  const [isOpenEdit, setOpenEdit] = useState(false)
  const {shoppingList, addToShoppingList, removeFromShoppingList, overwriteItem} = UseShoppingList();
  const [editing, setEditing] = useState<Item | undefined>(undefined);

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
    removeFromShoppingList(event.target.id);
  }

  const handleEdit = (event: any) => {
    const found = shoppingList.find((item) => { 
      return item.id === event.target.id
    });
    setEditing(found)
    onOpenEdit()
  }

  const onCloseAdd = () => setOpenAdd(false);
  const onOpenAdd = () => setOpenAdd(true);

  const onCloseEdit = () => setOpenEdit(false);
  const onOpenEdit = () => setOpenEdit(true);

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
            <Button onClick={onOpenAdd} variant='contained' sx={styles.addButton}>Add your first Item</Button>
          </Stack>
        )
      }
      {
        shoppingList.length > 0 && (
          <Container>
            <Button variant='contained' onClick={onOpenAdd}>Add Item</Button>
            <List>
              {shoppingList.map( item => (
                <ListItem key={item.id} sx={styles.listItem}>
                  <Checkbox checked={item.isChecked} onChange={handleCheckItem} id={item.id}/>
                  <Stack>
                    <Typography>{item.name}</Typography>
                    <Typography>{item.description}</Typography>
                  </Stack>
                  <IconButton edge="end" onClick={handleEdit}>
                    <span className="material-icons" id={item.id} >edit</span>
                  </IconButton>
                  <IconButton edge="end" onClick={handleDeleteItem}>
                    <span className="material-icons" id={item.id} >delete</span>
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Container>
        )
      }
    </Container>
    <ShoppingDrawer 
      onClose={onCloseAdd} 
      onOpen={onOpenAdd} 
      isOpen={isOpenAdd}  
      type={DrawerType.ADD} 
      handleChange={addToShoppingList}/>
    <ShoppingDrawer 
      onClose={onCloseEdit} 
      onOpen={onOpenEdit}
      onFinish={() => { setEditing(undefined)}} 
      isOpen={isOpenEdit}  
      type={DrawerType.EDIT} 
      item={editing}
      handleChange={overwriteItem}/>  

  </Stack>
  );
}

export default App;
