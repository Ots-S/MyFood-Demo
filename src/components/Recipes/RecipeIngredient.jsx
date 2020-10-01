import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DeleteIcon from "@material-ui/icons/Delete";

export default function RecipeIngredient({
  ingredient,
  unselectIngredientFromRecipe,
}) {
  const [isButtonHover, setIsButtonHover] = useState(false);
  return (
    <Button
      variant="outlined"
      key={ingredient.id}
      onClick={() => unselectIngredientFromRecipe(ingredient)}
      onMouseOver={() => setIsButtonHover(true)}
      onMouseLeave={() => setIsButtonHover(false)}
    >
      <Box mx={2}>{ingredient.name}</Box>
      {isButtonHover ? (
        <DeleteIcon fontsize="small" />
      ) : (
        <DeleteOutlineIcon fontsize="small" />
      )}
    </Button>
  );
}
