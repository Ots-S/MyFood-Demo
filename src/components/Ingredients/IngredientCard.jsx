import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
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
  const [open, setOpen] = useState(false);
  const [isButtonHover, setIsButtonHover] = useState(false);
  const { deleteIngredient } = useContext(Context);
  const classes = useStyles();

  function handleOpen() {
    setOpen(prev => !prev);
  }

  return (
    <Card className={classes.ingredientContainer} elevation={3}>
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
          <Button
            onClick={handleOpen}
            onMouseOver={() => setIsButtonHover(true)}
            onMouseLeave={() => setIsButtonHover(false)}
          >
            {isButtonHover ? <DeleteIcon /> : <DeleteOutlineIcon />}
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
};
