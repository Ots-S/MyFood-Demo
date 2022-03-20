import React, { useContext } from "react";
import { Grid, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../Context";
import Stat from "./Stat";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "5rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6rem",
    },
    height: "80vh",
  },
  title: {
    marginBottom: "1rem",
  },
  avatar: {
    marginBottom: "1rem",
    marginTop: "1rem",
    border: "10px solid green",
    borderRadius: "50%",
  },
  stats: {
    width: "18rem",
    margin: "1rem",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { ingredients, recipes, cookbooks } = useContext(Context);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      className={classes.container}
    >
      <img
        className={classes.avatar}
        src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
        alt="avatar"
      />
      <Typography variant="h6" color="primary" className={classes.title}>
        Sébastien
      </Typography>
      <Card elevation={3}>
        <Grid container direction="column" alignItems="center">
          <Stat label="Nombre d'ingrédients :" stat={ingredients.length} />
          <Stat label="Nombre de recettes :" stat={recipes.length} />
          <Stat
            label="Nombre de livres de recettes :"
            stat={cookbooks.length}
          />
        </Grid>
      </Card>
    </Grid>
  );
}
