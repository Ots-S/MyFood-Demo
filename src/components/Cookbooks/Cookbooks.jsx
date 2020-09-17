import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import CookbookCard from "./CookbookCard";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    height: "100vh",
  },
});

export default function Cookbooks() {
  const [name, setName] = useState("");
  const [cookbooks, setCookbooks] = useState();
  const [errorStatus, setErrorStatus] = useState();
  const [getError, setGetError] = useState();
  const [postError, setPostError] = useState();
  const [recipes, setRecipes] = useState([{}]);
  const classes = useStyles();

  useEffect(() => {
    getCookbooks();
    getRecipes();
  }, []);

  function getCookbooks() {
    axios
      .get("/cookbooks")
      .then(responses => setCookbooks(responses.data))
      .catch(error =>
        setGetError(
          "Erreur serveur - Impossible de récupérer les livres de recettes, veuillez réessayer plus tard."
        )
      );
  }

  function onChange(event) {
    setName(event.target.value);
  }

  function createCookbook() {
    let newCookbook = { name: name };
    axios
      .post("/cookbooks", newCookbook)
      .then(() => getCookbooks())
      .catch(error =>
        error.response.status === 406
          ? setPostError(
              "Le nom du livre de recette existe déjà, veuillez choisir un autre nom"
            )
          : setPostError(
              "Erreur serveur - Impossible d'enregistrer , veuillez réessayer plus tard."
            )
      );
  }

  function deleteCookbook(id) {
    axios
      .delete("/cookbooks/" + id)
      .then(() => getCookbooks())
      .catch(error => setErrorStatus(error.response.status));
  }

  function getRecipes() {
    axios.get("/recipes").then(responses => setRecipes(responses.data));
  }

  function addRecipeToCookbook(cookbookId, recipeId) {
    axios
      .post("/cookbooks/" + cookbookId + "/recipe/" + recipeId)
      .then(() => getCookbooks());
  }

  function deleteRecipeFromCookbook(cookbookId, recipeId) {
    axios
      .delete("/cookbooks/" + cookbookId + "/recipe/" + recipeId)
      .then(() => getCookbooks());
  }

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      direction="column"
      className={classes.container}
    >
      {postError && <Typography>{postError}</Typography>}
      <TextField
        style={{ width: "20rem" }}
        value={name}
        onChange={onChange}
        label="Entrez le nom de votre livre de recettes"
        required
      />
      <Box my={2}>
        <Button onClick={createCookbook} variant="contained" color="primary">
          Créer
        </Button>
      </Box>
      <Grid item container justify="center">
        {cookbooks
          ? cookbooks.map(cookbook => (
              <CookbookCard
                key={cookbook.id}
                cookbook={cookbook}
                deleteCookbook={deleteCookbook}
                addRecipeToCookbook={addRecipeToCookbook}
                recipes={recipes}
                deleteRecipeFromCookbook={deleteRecipeFromCookbook}
              />
            ))
          : !getError && <CircularProgress />}
      </Grid>
      {getError && <Typography align="center">{getError}</Typography>}
    </Grid>
  );
}
