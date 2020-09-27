import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { Context } from "../Context";

export default function DeleteConfirmationModal({
  element,
  deleteElement,
  handleOpen,
  open,
  title,
}) {
  const { deleteIngredient } = useContext(Context)
  function deleteElementAndCloseModal() {
    handleOpen();
    deleteIngredient(element);
  }

  return (
    <Dialog
      open={open}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title" align="center">
        {title}
      </DialogTitle>
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
