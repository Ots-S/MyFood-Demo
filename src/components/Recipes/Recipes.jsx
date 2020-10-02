import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RecipeCard from "./RecipeCard";
import { makeStyles } from "@material-ui/styles";
import RecipeIngredient from "./RecipeIngredient";
import Input from "../Input";
import { Context } from "../../Context";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "5rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6rem",
    },
  },
}));

export default function Recipes() {
  const {
    ingredients,
    recipes,
    recipeIndex,
    createRecipe,
    removeIngredientFromRecipe,
    isNameIsPresent,
    postError,
    setPostError,
  } = useContext(Context);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [ingredientError, setIngredientError] = useState(false);

  const classes = useStyles();

  function addIngredientToRecipeCreation(event, ingredient) {
    if (ingredient) {
      if (!recipeIngredients.includes(ingredient)) {
        setRecipeIngredients(prevState => [...prevState, ingredient]);
        setIngredientError(false);
      } else {
        setIngredientError(true);
      }
    }
  }

  function unselectIngredientFromRecipe(ingredient) {
    const newIngredientsList = recipeIngredients.filter(
      eachIngredient => eachIngredient.id !== ingredient.id
    );
    setRecipeIngredients(newIngredientsList);
  }

  function saveRecipe() {
    if (!isNameIsPresent(recipes, "name", recipeName)) {
      if (isValidImageUrl(image)) {
        const recipe = {
          id: recipeIndex + 1,
          name: recipeName,
          ingredients: recipeIngredients,
          image: image,
        };
        createRecipe(recipe);
        setRecipeName("");
        setImage("");
        setRecipeIngredients("");
      } else {
        setImageError(true);
      }
    }
  }

  function isValidImageUrl(url) {
    const extension = url.substring(url.length - 4);
    if (extension === ".jpg" || extension === ".png") {
      return true;
    }
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid container item xs={10} sm={8} md={6} lg={3}>
        <Input
          label="Entrez le nom d'une recette"
          value={recipeName}
          onChange={event => setRecipeName(event.target.value)}
          onFocus={() => setPostError(false)}
          error={postError}
          helperText={
            postError
              ? "Ce nom existe déjà, veuillez en choisir un autre."
              : " "
          }
        />
        <Input
          label="Entrez le lien d'une image"
          value={image}
          onChange={event => setImage(event.target.value)}
          onFocus={() => setImageError(false)}
          error={imageError}
          helperText={
            imageError
              ? "Lien non valide, vérifiez l'extension"
              : "Le lien doit se terminer par .jpg ou .png"
          }
        />
        <Grid item xs={12}>
          <Box my={2}>
            <Autocomplete
              value={ingredient}
              onChange={addIngredientToRecipeCreation}
              onFocus={() => setIngredientError(false)}
              fullWidth
              id="Ajouter un ingrédient"
              options={ingredients}
              getOptionLabel={ingredient =>
                typeof ingredient === "string" ? ingredient : ingredient.name
              }
              renderInput={params => (
                <TextField
                  error={ingredientError}
                  helperText={ingredientError ? "Ingrédient déjà présent" : " "}
                  fullWidth
                  {...params}
                  label="Ajouter un ingrédient"
                  variant="outlined"
                  required
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
      {recipeIngredients && (
        <Grid container spacing={1} item xs={11} md={10} lg={6}>
          {recipeIngredients
            .sort(function (a, b) {
              if (a.name !== b.name) {
                return b.name - a.name;
              }
            })
            .map(recipeIngredient => (
              <Grid item key={recipeIngredient.id}>
                <RecipeIngredient
                  ingredient={recipeIngredient}
                  unselectIngredientFromRecipe={unselectIngredientFromRecipe}
                />
              </Grid>
            ))}
        </Grid>
      )}
      <Box my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => saveRecipe()}
          disabled={!recipeName || !recipeIngredients.length > 0}
          className={classes.button}
        >
          Enregistrer la recette
        </Button>
      </Box>
      {recipes.length > 0 ? (
        <Grid container spacing={1} item xs={11} md={10} lg={6}>
          {recipes
            .sort(function (a, b) {
              if (a.id !== b.id) {
                return b.id - a.id;
              }
            })
            .map(recipe => (
              <Grid item xs={12} sm={6} lg={6} key={recipe.id}>
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  removeIngredientFromRecipe={removeIngredientFromRecipe}
                  ingredients={ingredients}
                />
              </Grid>
            ))}
        </Grid>
      ) : (
        <Box mt={25}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Grid>
  );
}
