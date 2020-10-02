import React, { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../Context";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "5rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6rem",
    },
  },
  title: {
    marginBottom: "5rem",
  },
  avatar: {
    marginBottom: "5rem",
    marginTop: "5rem",
    border: "10px solid green",
    borderRadius: "50%",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { ingredients, recipes, cookbooks } = useContext(Context);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <img
        className={classes.avatar}
        src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
        alt="avatar"
      />
      <Typography variant="h6" className={classes.title}>
        Sébastien
      </Typography>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography>Nombre d'ingrédient : {ingredients.length}</Typography>
          <Typography>Nombre de recettes : {recipes.length}</Typography>
          <Typography>
            Nombre de livres de recettes : {cookbooks.length}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
