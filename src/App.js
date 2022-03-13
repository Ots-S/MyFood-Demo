import React from "react";
import "./App.css";
import Home from "./components/Home";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import Ingredients from "./components/Ingredients/Ingredients";
import Recipes from "./components/Recipes/Recipes";
import Cookbooks from "./components/Cookbooks/Cookbooks";
import Profile from "./components/Profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme";
import { ContextProvider } from "./Context";

const useStyles = makeStyles(theme => ({
}));

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <div className={classes.container}>
          <Router>
            <ResponsiveDrawer />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/ingredients" component={Ingredients} />
              <Route exact path="/recipes" component={Recipes} />
              <Route exact path="/cookbooks" component={Cookbooks} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </Router>
        </div>
      </ContextProvider>
    </ThemeProvider>
  );
}
