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
import { Context } from "../../Context";
import PropTypes from "prop-types";

export default function InformationModal({
  adding,
  cookbook,
  deleteRecipeFromCookbook,
  handleOpen,
  items,
  open,
  recipe,
  removeIngredientFromRecipe,
  title,
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
              justifyContent="space-between"
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
        <Grid container justifyContent="center">
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

InformationModal.propTypes = {
  adding: PropTypes.bool,
  cookbook: PropTypes.object,
  deleteRecipeFromCookbook: PropTypes.func,
  handleOpen: PropTypes.func.isRequired,
  items: PropTypes.array,
  open: PropTypes.bool.isRequired,
  recipe: PropTypes.object,
  removeIngredientFromRecipe: PropTypes.func,
  title: PropTypes.string,
};
