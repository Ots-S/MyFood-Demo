import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  Card,
  CardActions,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PopUp from "../PopUp";

const useStyles = makeStyles({
  root: {
    width: 275,
    height: 300,
  },
  title: {
    fontSize: 14,
  },
  image: {
    objectFit: "cover",
  },
});

export default function RecipeCard({ recipe, deleteRecipe }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  function openIngredientsPopUp() {
    setOpenModal(prevState => !prevState);
  }

  return (
    <Card className={classes.root}>
      <Grid container justify="center">
        <CardContent>
          <Typography color="primary" variant="h5" component="h2">
            {recipe.name}
          </Typography>
          <CardMedia
            component="img"
            src={recipe.image}
            className={classes.image}
            title={recipe.name}
          />
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={openIngredientsPopUp}>
            <FormatListBulletedIcon />
          </Button>
          <Button color="primary" onClick={() => deleteRecipe(recipe.id)}>
            <DeleteOutlineIcon />
          </Button>
        </CardActions>
      </Grid>
      {openModal && (
        <PopUp
          open={openModal}
          items={recipe.ingredients}
          handleOpen={openIngredientsPopUp}
        />
      )}
    </Card>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
};
