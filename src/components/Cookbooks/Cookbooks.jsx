import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import CookbookCard from "./CookbookCard";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmationModal from "../ConfirmationModal";
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

export default function Cookbooks() {
  const {
    recipes,
    cookbooks,
    createCookbook,
    idCookbookNumber,
    deleteCookbook,
    deleteRecipeFromCookbook,
  } = useContext(Context);
  const [name, setName] = useState("");
  const [getError, setGetError] = useState();
  const [postError, setPostError] = useState();
  const [deleteError, setDeleteError] = useState();
  const [addError, setAddError] = useState();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {}, []);

  function onChange(event) {
    setName(event.target.value);
  }

  function saveCookbook() {
    let newCookbook = { id: idCookbookNumber + 1, name: name, recipes: [] };
    createCookbook(newCookbook);
  }

  async function addRecipeToCookbook(cookbookId, recipeId) {
    try {
      const response = await axios.post(
        "/cookbooks/" + cookbookId + "/recipe/" + recipeId
      );
      if (response) {
        setConfirmationModal(true);
      }
    } catch (error) {
      setAddError(true);
    }
  }

  function describeError(error) {
    switch (error) {
      case 406:
        return "Ce nom existe déjà, veuillez en choisir un autre.";
      case 500:
        return "Erreur serveur - Impossible d'afficher ou d'envoyer des données, veuillez réessayer plus tard.";
      default:
        return "";
    }
  }

  function handleOpen() {
    setConfirmationModal(prevState => !prevState);
  }

  function handleOpenError() {
    setAddError(prevState => !prevState);
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
          label="Entrez le nom du livre de recettes"
          value={name}
          onChange={onChange}
          onFocus={() => setPostError(false)}
          error={postError}
          helperText={describeError(postError)}
        />
      </Grid>
      <Box my={2}>
        <Button onClick={saveCookbook} variant="contained" color="primary">
          Créer
        </Button>
      </Box>
      {cookbooks ? (
        <Grid container spacing={1} item xs={11} md={10} lg={6}>
          {cookbooks.map(cookbook => (
            <Grid item lg={6} key={cookbook.id}>
              <CookbookCard
                cookbook={cookbook}
                deleteCookbook={deleteCookbook}
                addRecipeToCookbook={addRecipeToCookbook}
                recipes={recipes}
                deleteRecipeFromCookbook={deleteRecipeFromCookbook}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box mt={25}>{!getError && <CircularProgress />}</Box>
      )}
      <Grid item>
        {deleteError && <Typography align="center">{deleteError}</Typography>}
      </Grid>
      <Grid item>
        {getError && (
          <Typography align="center">{describeError(getError)}</Typography>
        )}
      </Grid>
      {confirmationModal && (
        <ConfirmationModal
          open={confirmationModal}
          handleOpen={handleOpen}
          title={"La recette a bien été ajoutée"}
        />
      )}
      {addError && (
        <ConfirmationModal
          open={addError}
          handleOpen={handleOpenError}
          title={"La recette est déjà présente dans le livre de recette"}
        />
      )}
    </Grid>
  );
}
