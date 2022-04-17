import { AppBar, SwipeableDrawer, Toolbar, Typography, Icon, IconButton, Container } from "@mui/material";
import { styles } from '../../styles'


interface ItemDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export default function AddItemDrawer(props: ItemDrawerProps){



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
            <Container>
                
            </Container>
            
          </SwipeableDrawer>
    )
}