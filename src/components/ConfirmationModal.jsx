import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { Context } from "../Context";
import PropTypes from "prop-types";

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
}) {
  const { addIngredientToRecipe } = useContext(Context);

  function checkIfAlreadyAdded(ingredient) {
    let alreayPresent = false;
    recipe.ingredients.forEach(function (ingredientInRecipe) {
      if (ingredientInRecipe.id === ingredient.id) {
        alreayPresent = true;
      }
    });
    return alreayPresent;
  }

  return (
    <Dialog open={open} disableScrollLock>
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
                    onClick={() => addIngredientToRecipe(recipe, item)}
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
                        ? () => deleteRecipeFromCookbook(cookbook, item)
                        : () => removeIngredientFromRecipe(recipe, item)
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

ConfirmationModal.propTypes = {
  recipe: PropTypes.object,
  cookbook: PropTypes.object,
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  items: PropTypes.array,
  handleOpen: PropTypes.func.isRequired,
  deleteRecipeFromCookbook: PropTypes.func,
  removeIngredientFromRecipe: PropTypes.func,
  adding: PropTypes.func,
};
