import { Popover, Button, Typography, Grid } from "@mui/material";
import {styles} from '../../styles'


export interface DeleteDialogViewProps{
    itemID: string;
    open: boolean;
    handleClose: () => void;
    handleConfirm: (id: string) => void;
} 

export default function DeleteDialogView(props: DeleteDialogViewProps) {


    return (
        <Popover
            open={props.open}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{  
                vertical: 'center',
                horizontal: 'center',
            }}
            PaperProps={{style: styles.deleteDialogBox}}
        >
            <Grid container  sx={styles.deleteDialogBoxContainer}>
                <Typography variant="h5">Delete Item?</Typography>
                <Typography >Are you sure you want to delete this item? This can not be undone.</Typography>
                <Grid container justifyContent="flex-end" sx={styles.deleteDialogBoxButtons}>
                    <Button onClick={props.handleClose} sx={styles.drawerCancelButton}>cancel</Button>
                    <Button variant='contained' onClick={() => {props.handleConfirm(props.itemID)}} >Delete</Button>
                </Grid>
            </Grid>
        </Popover>
    );

}