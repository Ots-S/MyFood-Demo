import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../assets/background-image.jpg";

const useStyles = makeStyles({
  container: {
    marginTop: "7vh",
    backgroundImage: `url(${backgroundImage})`,
    height: "93vh",
    backgroundSize: "cover",
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid
        container
        item
        justify="center"
        alignItems="center"
        xs={8}
        sm={6}
        md={4}
        lg={2}
        className={classes.content}
      >
        <Typography color="primary" variant="h2">
          MyFood
        </Typography>
        <Box m={1}>
          <Typography align="center" color="primary">
            Réalisé avec React et Material-UI
          </Typography>
          <Typography align="center" color="primary">
            Les données ne sont pas persistantes
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
