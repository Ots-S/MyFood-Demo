import React, { useState, useContext } from "react";
import { Box, Button, CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IngredientCard from "./IngredientCard";
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

export default function Ingredients() {
  const {
    ingredients,
    ingredientIndex,
    createIngredient,
    postError,
    setPostError,
  } = useContext(Context);
  const [ingredientName, setIngredientName] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const classes = useStyles();

  function onChangeInput(event) {
    setIngredientName(event.target.value);
  }

  function onChangeImage(event) {
    setImage(event.target.value);
  }

  function saveIngredient() {
    if (isValidImageUrl(image)) {
      const newIngredient = {
        id: ingredientIndex + 1,
        name: ingredientName,
        image: image,
      };
      createIngredient(newIngredient);
      setIngredientName("");
      setImage("");
    } else {
      setImageError(true);
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
      <Grid container item direction="column" xs={10} sm={8} md={6} lg={3}>
        <Input
          label="Entrez le nom d'un ingrédient"
          value={ingredientName}
          onChange={onChangeInput}
          onFocus={() => setPostError(false)}
          error={postError}
          helperText={
            postError && "Ce nom existe déjà, veuillez en choisir un autre."
          }
        />
        <Input
          label="Entrez le lien d'une image (jpg ou png)"
          value={image}
          onChange={onChangeImage}
          onFocus={() => setImageError(false)}
          error={imageError}
          helperText={imageError && "Lien non valide, vérifiez l'extension"}
          className={classes.input}
        />
      </Grid>
      <Box my={2}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => saveIngredient()}
          disabled={!image || !ingredientName}
        >
          Ajouter
        </Button>
      </Box>
      {ingredients.length > 0 ? (
        <Grid container item spacing={1} xs={11} md={10} lg={6}>
          {ingredients.map(ingredient => (
            <Grid item xs={12} sm={4} key={ingredient.id}>
              <IngredientCard ingredient={ingredient} />
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
