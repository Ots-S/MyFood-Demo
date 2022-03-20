import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  stats: {
    width: "18rem",
    margin: "1rem",
  },
});

export default function Stat({ label, stat }) {
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between" item className={classes.stats}>
      <Typography>{label}</Typography>
      <Typography color="primary">{stat}</Typography>
    </Grid>
  );
}

Stat.propTypes = {
  label: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired,
};
