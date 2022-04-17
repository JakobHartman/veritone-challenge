
import { AppBar, 
    SwipeableDrawer, 
    Toolbar, 
    Typography, 
    IconButton, 
    Container, 
    TextField, 
    Stack, 
    Button, 
    Grid
} from "@mui/material";
import { useState } from "react";
import { styles } from '../../styles'
import { Item } from "../../types";


interface ItemDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    characterLimit?: number;
    item?: Item;
    type: DrawerType;
}

export enum  DrawerType {
    ADD,
    EDIT
}

export default function ShoppingDrawer(props: ItemDrawerProps){

    let CHARACTER_LIMIT = props.characterLimit ? props.characterLimit : 100;
    const [descriptionText, setDescriptionText] = useState(props.item ? props.item.description : "");
    const [nameText, setName] = useState(props.item ? props.item.name : "");
    const [count, setCount] = useState(props.item ? props.item.count : 0);

    const handleTitle = () => {
        switch(props.type){
            case DrawerType.ADD:
                return "Add an Item";
            case DrawerType.EDIT:
                return "";    
            default:
                throw new Error("Invalid Type...")   
        }
    }

    const handleInstructions = () => {
        switch(props.type){
            case DrawerType.ADD:
                return "Add your new item below";
            case DrawerType.EDIT:
                return "";    
            default:
                throw new Error("Invalid Type...")   
        }
    }

    const handleDescChange = (event: any) => setDescriptionText(event.target.value)
    const handleNameChange = (event: any) => setName(event.target.value)
    const handleCountChange = (event: any) => { 
        //remove any non-Digit characters
        let newValue = event.target.value.replace(/\D/g,'');
        setCount(newValue)
        event.target.value = newValue; 
    }

    return (
        <SwipeableDrawer
            anchor={"right"}
            open={props.isOpen}
            onClose={props.onClose}
            onOpen={props.onOpen}
            PaperProps={{style: styles.addDrawer}}
          >
            <AppBar position='sticky' sx={styles.appBarGrey}>
                <Toolbar variant='dense'>
                    <Typography sx={styles.addDrawerHeader}>
                        SHOPPING LIST
                    </Typography>
                    <IconButton edge="end" onClick={props.onClose}>
                        <span className="material-icons">last_page</span>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={styles.drawerContent}>
                <Stack spacing={2}>
                    <Typography>{handleTitle()}</Typography>
                    <Typography>{handleInstructions()}</Typography>
                    <TextField id="name" label="Item Name" variant="outlined" onChange={handleNameChange}/>
                    <TextField id='description' 
                        label="Description" 
                        inputProps={{maxLength: CHARACTER_LIMIT}} 
                        helperText={`${descriptionText.length}/${CHARACTER_LIMIT}`}
                        onChange={handleDescChange}
                        variant="outlined"
                        rows={4}
                        multiline/>
                    <TextField id='itemCount' 
                        label="How many?" 
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onChange={handleCountChange}
                        variant="outlined"/>
                    <Grid container justifyContent="flex-end">
                        <Button sx={styles.drawerCancelButton}>Cancel</Button>
                        <Button variant='contained'>Add Task</Button>
                    </Grid>  
                </Stack>           
            </Container>
          </SwipeableDrawer>
    )
}