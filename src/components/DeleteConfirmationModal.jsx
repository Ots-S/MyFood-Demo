import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@material-ui/core";

export default function DeleteConfirmationModal({
  element,
  deleteElement,
  handleOpen,
  open,
  title,
}) {
  function deleteElementAndCloseModal() {
    handleOpen();
    deleteElement(element);
  }

  return (
    <Dialog
      disableScrollLock
      open={open}
      aria-labelledby="confirmation de suppression"
      aria-describedby="confirmation de suppression"
    >
      <DialogTitle id="confirmation de suppression" align="center">
        {title}
      </DialogTitle>
      <DialogContent>
        <Grid container justify="center">
          <DialogContentText>{element.name.toUpperCase()}</DialogContentText>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-around">
          <Button
            color="primary"
            variant="contained"
            autoFocus
            onClick={deleteElementAndCloseModal}
          >
            SUPPRIMER
          </Button>
          <Button
            variant="outlined"
            color="primary"
            autoFocus
            onClick={handleOpen}
          >
            ANNULER
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
