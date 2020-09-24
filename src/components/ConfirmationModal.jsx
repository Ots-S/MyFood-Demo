import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

export default function ConfirmationModal({
  recipe,
  cookbook,
  title,
  open,
  items,
  handleOpen,
  deleteRecipeFromCookbook,
  removeIngredientFromRecipe,
  adding,
  addIngredientToRecipe,
}) {
  function checkIfAlreadyAdded(ingredient) {
    let alreayPresent = false;
    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (recipe.ingredients[i].id === ingredient.id) {
        alreayPresent = true;
      }
    }
    return alreayPresent;
  }

  function addIngredient(item, recipe, ingredient) {
    addIngredientToRecipe(recipe, ingredient);
    checkIfAlreadyAdded(item);
  }

  return (
    <Dialog
      open={open}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        {items &&
          items.map(item => (
            <Grid
              key={item.id}
              container
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body2" key={item.id}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid item>
                {adding ? (
                  <Button
                    disabled={checkIfAlreadyAdded(item)}
                    onClick={() => addIngredient(item, recipe.id, item.id)}
                  >
                    {checkIfAlreadyAdded(item) ? (
                      <PlaylistAddCheckIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={
                      deleteRecipeFromCookbook
                        ? () => deleteRecipeFromCookbook(cookbook.id, item.id)
                        : () => removeIngredientFromRecipe(recipe.id, item.id)
                    }
                  >
                    X
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
      </DialogContent>
      <DialogActions>
        <Grid container justify="center">
          <Button
            variant="outlined"
            color="primary"
            autoFocus
            onClick={handleOpen}
          >
            FERMER
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
