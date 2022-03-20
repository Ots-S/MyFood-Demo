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
import PropTypes from "prop-types";

export default function DeleteConfirmationModal({
  deleteElement,
  element,
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
        <Grid container justifyContent="center">
          <DialogContentText color="primary">
            {element.name.toUpperCase()}
          </DialogContentText>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-around">
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

DeleteConfirmationModal.propTypes = {
  element: PropTypes.object.isRequired,
  deleteElement: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
