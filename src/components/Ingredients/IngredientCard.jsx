import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { Context } from "../../Context";

const useStyles = makeStyles({
  ingredientContainer: {
    margin: ".1em",
    padding: ".5em",
  },
  image: {
    borderRadius: 10,
    height: "5rem",
    objectFit: "cover",
  },
  cardContent: {
    height: "4rem",
  },
  title: {
    fontSize: "17px",
  },
});

export default function IngredientContainer({ ingredient }) {
  const classes = useStyles();
  const [open, setOpen] = useState();
  const { deleteIngredient } = useContext(Context);

  function handleOpen() {
    setOpen(prev => !prev);
  }

  return (
    <Card className={classes.ingredientContainer}>
      <Grid container justify="center">
        <CardContent className={classes.cardContent}>
          <Typography color="primary" align="center" className={classes.title}>
            {ingredient.name.toUpperCase()}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          src={ingredient.image}
          className={classes.image}
          title={ingredient.name}
        />
        <CardActions>
          <Button onClick={() => setOpen(prev => !prev)}>
            <DeleteOutlineIcon />
          </Button>
        </CardActions>
      </Grid>
      <DeleteConfirmationModal
        title={"Êtes-vous sûr de vouloir supprimer cet ingrédient ?"}
        element={ingredient}
        open={open}
        handleOpen={handleOpen}
        deleteElement={deleteIngredient}
      />
    </Card>
  );
}

IngredientContainer.propTypes = {
  ingredient: PropTypes.object.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
};
