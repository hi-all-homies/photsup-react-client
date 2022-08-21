import Dialog  from "@mui/material/Dialog";
import DialogTitle  from "@mui/material/DialogTitle";
import DialogContent  from "@mui/material/DialogContent";
import DialogActions  from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField  from "@mui/material/TextField";
import { useState } from "react";


const StatusDialog = ({open, close, update}) => {
    const[status, setStatus] = useState('');
    const onValueChange = (event) => setStatus(event.target.value);

    const updateStatus = () => {
        update(status).then(resp => {
            if (resp.ok){
                setStatus('');
                close();
            }
        })
    }

    return (
        <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
            <DialogTitle>
                What's new?
            </DialogTitle>

            <DialogContent>
                <TextField value={status} onChange={onValueChange} label="new status"
                    margin="dense" autoFocus variant="standard" fullWidth/>
            </DialogContent>

            <DialogActions>
                <Button onClick={close}>cancel</Button>
                <Button onClick={updateStatus} disabled={status.length < 3} >
                    set
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default StatusDialog;