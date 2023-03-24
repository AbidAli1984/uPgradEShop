import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteConfirmation(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm deletion of product!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={props.deleteHandler}
          >
            OK
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.closeDeleteConfirm}
            autoFocus
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
