import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const CustomSnack = (props) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        props.closeSnack()
      };

    return (
        <Snackbar open={props.open} onClose={handleClose} autoHideDuration={7000}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            
            <MuiAlert onClose={handleClose} variant="filled" severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
            </MuiAlert>
        </Snackbar>
    );
}

export default CustomSnack;