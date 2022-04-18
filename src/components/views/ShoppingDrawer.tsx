
import { AppBar, 
    SwipeableDrawer, 
    Toolbar, 
    Typography, 
    IconButton, 
    Container, 
    TextField, 
    Stack, 
    Button, 
    Grid,
    Checkbox
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { styles } from '../../styles'
import { Item } from "../../types";


interface ItemDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    handleChange: (item: Item) => void;
    onFinish?: () => void;
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
    const [descriptionText, setDescriptionText] = useState("");
    const [nameText, setName] = useState("");
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState( false)


    useEffect(() => {
        if(props.item && props.type === DrawerType.EDIT){
            setDescriptionText(props.item.description);
            setName(props.item.name);
            setCount(props.item.count);
            setChecked(props.item.isChecked);
        } else {
            setDescriptionText("");
            setName("");
            setCount(0);
            setChecked(false);
        }
    }, [props.type, props.item])

    const getKey = () => {
        return props.item ? props.item.id : uuidv4()
    }


    const handleTitle = () => {
        switch(props.type){
            case DrawerType.ADD:
                return "Add an Item";
            case DrawerType.EDIT:
                return "Edit an Item";    
            default:
                throw new Error("Invalid Type...")   
        }
    }

    const handleInstructions = () => {
        switch(props.type){
            case DrawerType.ADD:
                return "Add your new item below";
            case DrawerType.EDIT:
                return "Edit your item below";    
            default:
                throw new Error("Invalid Type...")   
        }
    }

    const handleSaveButtonText = () => {
        switch(props.type){
            case DrawerType.ADD:
                return "Add Item";
            case DrawerType.EDIT:
                return "Save Item";    
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

    const handleCheckChange = (event: any) => {
        setChecked(event.target.checked)
    }

    return (
        <SwipeableDrawer
            anchor={"right"}
            open={props.isOpen}
            onClose={props.onClose}
            onOpen={props.onOpen}
            PaperProps={{style: styles.addDrawer}}
            key={props.item?.id}
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
                    <Typography key={getKey()}>{handleTitle()}</Typography>
                    <Typography>{handleInstructions()}</Typography>
                    <TextField id="name" label="Item Name" variant="outlined" onChange={handleNameChange} value={nameText}/>
                    <TextField id='description' 
                        label="Description" 
                        inputProps={{maxLength: CHARACTER_LIMIT}} 
                        helperText={`${descriptionText.length}/${CHARACTER_LIMIT}`}
                        onChange={handleDescChange}
                        variant="outlined"
                        rows={5}
                        value={descriptionText}
                        multiline/>
                    <TextField id='itemCount' 
                        label="How many?" 
                        onChange={handleCountChange}
                        value={count}
                        variant="outlined"/>
                    {
                        props.type === DrawerType.EDIT && (
                            <Stack direction='row'>
                                <Checkbox checked={checked} onChange={handleCheckChange}/>
                                <Typography sx={{mt: 1.25}}>Purchased</Typography>
                            </Stack>
                        )
                    }    
                    <Grid container justifyContent="flex-end">
                        <Button sx={styles.drawerCancelButton} onClick={props.onClose}>Cancel</Button>
                        <Button variant='contained' onClick={() => {

                            if(props.type === DrawerType.EDIT && props.item){
                                props.handleChange({
                                    id: props.item.id,
                                    name: nameText,
                                    description: descriptionText,
                                    count: count,
                                    isChecked: checked
                                });
                            }else {
                                props.handleChange(
                                    {
                                        id: uuidv4(),
                                        name: nameText,
                                        description: descriptionText,
                                        count: count,
                                        isChecked: false
                                    })
                            }
                            props.onClose()
                            props.onFinish?.()
                        }}>{handleSaveButtonText()}</Button>
                    </Grid>  
                </Stack>           
            </Container>
          </SwipeableDrawer>
    )
}