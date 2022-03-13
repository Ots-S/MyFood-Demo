import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import InformationModal from "../Modals/InformationModal";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Context } from "../../Context";

const useStyles = makeStyles({
  root: { width: "100%" },
  image: {
    height: "5rem",
    objectFit: "cover",
  },
  gridImages: {
    height: "5rem",
    width: "100%",
    margin: "1em 0",
  },
});

export default function CookbookCard({
  cookbook,
  deleteCookbook,
  recipes,
  deleteRecipeFromCookbook,
  handleOpen,
}) {
  const classes = useStyles();
  const [recipe, setRecipe] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [
    openDeleteConfirmationModal,
    setOpenDeleteConfirmationModal,
  ] = useState(false);
  const [isButtonHover, setIsButtonHover] = useState(false);
  const { addRecipeToCookbook } = useContext(Context);

  function openRecipesPopUp() {
    setOpenModal(prevState => !prevState);
  }

  function openDeleteModal() {
    setOpenDeleteConfirmationModal(prevState => !prevState);
  }

  function handleChange(event) {
    setRecipe(event.target.value);
  }

  function addRecipCookbook() {
    addRecipeToCookbook(cookbook, recipe);
    setRecipe("");
    handleOpen();
  }

  return (
    <Card className={classes.root} elevation={3}>
      <Grid container item justifyContent="center">
        <CardContent>
          <Typography color="primary" variant="h5" component="h2">
            {cookbook.name}
          </Typography>
        </CardContent>
        <Grid container justifyContent="center" className={classes.gridImages}>
          {cookbook.recipes.slice(0, 3).map(recipe => (
            <Grid item xs={4} key={recipe.id}>
              <CardMedia
                component="img"
                src={recipe.image}
                className={classes.image}
                title={recipe.image}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center" item xs={12}>
          <FormControl>
            <InputLabel id="ajouter une recette">
              Ajouter une recette
            </InputLabel>
            <Select
              MenuProps={{
                disableScrollLock: true,
              }}
              style={{ width: "15rem" }}
              label="Ajouter une recette"
              id="ajouter une recette"
              value={recipe}
              onChange={handleChange}
            >
              {recipes.map(recipe => (
                <MenuItem key={recipe.id} value={recipe}>
                  {recipe.name}
                </MenuItem>
              ))}
            </Select>
            <CardActions>
              <Button
                fullWidth
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => addRecipCookbook(cookbook.id, recipe.id)}
                disabled={!recipe}
              >
                Ajouter
              </Button>
            </CardActions>
          </FormControl>
        </Grid>
        <CardActions>
          <Button onClick={() => openRecipesPopUp()}>
            <FormatListBulletedIcon />
          </Button>
          <Button
            onClick={openDeleteModal}
            onMouseOver={() => setIsButtonHover(true)}
            onMouseLeave={() => setIsButtonHover(false)}
          >
            {isButtonHover ? <DeleteIcon /> : <DeleteOutlineIcon />}
          </Button>
        </CardActions>
      </Grid>
      {openModal && (
        <InformationModal
          title={"Liste des recettes"}
          open={openModal}
          cookbook={cookbook}
          items={cookbook.recipes}
          handleOpen={openRecipesPopUp}
          deleteRecipeFromCookbook={deleteRecipeFromCookbook}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          title={"Êtes-vous sûr de vouloir supprimer ce livre de recettes ?"}
          element={cookbook}
          open={openDeleteConfirmationModal}
          handleOpen={openDeleteModal}
          deleteElement={deleteCookbook}
        />
      )}
    </Card>
  );
}

CookbookCard.propTypes = {
  cookbook: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  deleteRecipeFromCookbook: PropTypes.func.isRequired,
};
