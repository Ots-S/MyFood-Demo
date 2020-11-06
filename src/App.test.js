import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import Ingredients from "./components/Ingredients/Ingredients";
import App from "./App";
import { shallow } from "enzyme";
import Recipes from "./components/Recipes/Recipes";
import Cookbooks from "./components/Cookbooks/Cookbooks";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home";

describe("App", () => {
  let appWrapper;

  beforeAll(() => {
    appWrapper = shallow(<App />);
  });

  it("renders Ingredients component", () => {
    appWrapper.find(Ingredients);
  });

  it("renders Recipe component", () => {
    appWrapper.find(Recipes);
  });

  it("renders Cookbook component", () => {
    appWrapper.find(Cookbooks);
  });

  it("renders Profil component", () => {
    appWrapper.find(Profile);
  });

  it("renders Home component", () => {
    appWrapper.find(Home);
  });
});
