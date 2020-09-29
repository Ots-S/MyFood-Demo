import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RecipeCard from "./RecipeCard";
import { makeStyles } from "@material-ui/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Input from "../Input";
import { Context } from "../../Context";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "5rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6rem",
    },
  },
  input: {
    marginTop: "1rem",
  },
}));

function Recipes() {
  const {
    ingredients,
    recipes,
    getError,
    idRecipeNumber,
    createRecipe,
    removeIngredientFromRecipe,
  } = useContext(Context);
  const [ingredient, setIngredient] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [postError, setPostError] = useState(false);
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const classes = useStyles();

  function addIngredientToRecipeCreation(ingredient) {
    if (!recipeIngredients.includes(ingredient)) {
      setRecipeIngredients(prevState => [...prevState, ingredient]);
    }
  }

  function unselectIngredientFromRecipe(ingredient) {
    const newIngredientsList = recipeIngredients.filter(
      eachIngredient => eachIngredient.id !== ingredient.id
    );
    setRecipeIngredients(newIngredientsList);
  }

  function saveRecipe() {
    if (isValidImageUrl(image)) {
      const recipe = {
        id: idRecipeNumber + 1,
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

  function describeError(error) {
    switch (error) {
      case 406:
        return "Ce nom existe déjà, veuillez en choisir un autre";
      case 500:
        return "Erreur serveur - Impossible d'afficher ou d'envoyer des données, veuillez réessayer plus tard.";
      default:
        return "";
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
          label="Nom de la recette"
          value={recipeName}
          onChange={event => setRecipeName(event.target.value)}
          onFocus={() => setPostError(false)}
          error={postError}
          helperText={describeError(postError)}
        />
        <Input
          label="Photo de la recette"
          value={image}
          onChange={event => setImage(event.target.value)}
          onFocus={() => setImageError(false)}
          error={imageError}
          helperText={imageError && "Lien non valide, vérifiez l'extension"}
          className={classes.input}
        />
      </Grid>
      <Grid item>
        <Box my={2}>
          <Autocomplete
            disableClearable
            value={ingredient}
            onChange={(event, newIngredient) => {
              addIngredientToRecipeCreation(newIngredient);
            }}
            id="Ajouter un ingrédient"
            options={ingredients}
            getOptionLabel={ingredient => ingredient.name}
            style={{ width: "22rem" }}
            renderInput={params => (
              <TextField
                {...params}
                label="Ajouter un ingrédient"
                variant="outlined"
                required
              />
            )}
          />
        </Box>
      </Grid>
      {recipeIngredients.length > 0 && (
        <Grid container spacing={1} item xs={11} md={10} lg={6}>
          {recipeIngredients.map(ingredient => (
            <Grid item>
              <Button
                key={ingredient.id}
                onClick={() => unselectIngredientFromRecipe(ingredient)}
              >
                {ingredient.name}
                <DeleteOutlineIcon fontize="small" />
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => saveRecipe()}
        disabled={!recipeName || !recipeIngredients.length > 0}
        className={classes.button}
        my={2}
      >
        Enregistrer la recette
      </Button>

      {recipes.length > 0 ? (
        <Grid container spacing={1} item xs={11} md={10} lg={6}>
          {recipes.map(recipe => (
            <Grid item lg={6} sm={6} lg={6} key={recipe.id}>
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
        <Box mt={25}>{!getError && <CircularProgress color="primary" />}</Box>
      )}
      <Grid item>
        {getError && (
          <Box mx={2}>
            <Typography align="center">{describeError(getError)}</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

Recipes.propTypes = {};

export default Recipes;
