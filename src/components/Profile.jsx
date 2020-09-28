import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Context } from "../Context"

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
    marginBottom: "5rem"
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const { recipes, cookbooks } = useContext(Context)

  useEffect(() => {

  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Typography variant="h6" className={classes.title}>Marc</Typography>
      <img className={classes.avatar} src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" alt="avatar" />
      <Typography>Nombre de recettes : {recipes.length}</Typography>
      <Typography>Nombre de livres de recettes : {cookbooks.length}</Typography>
    </Grid>
  );
}
