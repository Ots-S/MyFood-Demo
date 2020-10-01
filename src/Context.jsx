import React, { useState, useEffect, createContext } from "react";
import {
  ingredientsList,
  recipesList,
  cookbooksList,
} from "./assets/data.json";

const Context = createContext();

function ContextProvider(props) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [cookbooks, setCookbooks] = useState([]);
  const [postError, setPostError] = useState(false);
  const [ingredientIndex, setIngredientIndex] = useState(0);
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [cookbookIndex, setCookbookIndex] = useState(0);

  useEffect(() => {
    setIngredients(ingredientsList);
    setIngredientIndex(ingredientsList.length);
    setRecipes(recipesList);
    setRecipeIndex(recipesList.length);
    setCookbooks(cookbooksList);
    setCookbookIndex(cookbooksList.length);
  }, []);

  function createIngredient(ingredient) {
    setIngredients([ingredient, ...ingredients]);
    setIngredientIndex(prevState => prevState + 1);
  }

  function createRecipe(recipe) {
    const newRecipes = [recipe, ...recipes];
    setRecipes(newRecipes);
    setRecipeIndex(prevState => prevState + 1);
  }

  function createCookbook(cookbook) {
    let alreadyExist = false;
    cookbooks.forEach(existingCookbook => {
      if (existingCookbook.name.toLowerCase() === cookbook.name.toLowerCase()) {
        alreadyExist = true;
      }
    });
    if (alreadyExist) {
      setPostError(true);
    } else {
      const newCookooks = [cookbook, ...cookbooks];
      setCookbooks(newCookooks);
      setCookbookIndex(prevState => prevState + 1);
    }
  }

  function deleteIngredient(ingredient) {
    const newIngredientsList = ingredients.filter(
      existingIngredient => existingIngredient !== ingredient
    );
    setIngredients(newIngredientsList);

    let recipeToModify = {};
    recipes.forEach(existingRecipe => {
      existingRecipe.ingredients.forEach(existingIngredient => {
        if (existingIngredient.id === ingredient.id) {
          recipeToModify = existingRecipe;
        }
      });
    });
    removeIngredientFromRecipe(recipeToModify, ingredient);
  }

  function deleteRecipe(recipe) {
    const newRecipes = recipes.filter(
      existingRecipe => existingRecipe !== recipe
    );
    setRecipes(newRecipes);
    let cookbookToModify = {};
    cookbooks.forEach(existingCookbook => {
      existingCookbook.recipes.forEach(existingRecipe => {
        if (existingRecipe.id === recipe.id) {
          cookbookToModify = existingCookbook;
        }
      });
    });
    deleteRecipeFromCookbook(cookbookToModify, recipe);
  }

  function deleteCookbook(cookbook) {
    const newCookbooks = cookbooks.filter(
      existingCookbook => existingCookbook !== cookbook
    );
    setCookbooks(newCookbooks);
  }

  function addIngredientToRecipe(recipe, ingredient) {
    const newRecipe = recipes.find(existingRecipe => existingRecipe === recipe);
    const previousRecipes = recipes.filter(
      existingRecipe => existingRecipe !== newRecipe
    );
    newRecipe.ingredients = [...newRecipe.ingredients, ingredient];
    setRecipes([...previousRecipes, newRecipe]);
  }

  function addRecipeToCookbook(cookbook, recipe) {
    const newCookbook = cookbooks.find(
      existingCookbook => existingCookbook === cookbook
    );
    const previousCookbooks = cookbooks.filter(
      existingCookbook => existingCookbook !== cookbook
    );
    newCookbook.recipes = [...newCookbook.recipes, recipe];
    setCookbooks([...previousCookbooks, cookbook]);
  }

  function removeIngredientFromRecipe(recipe, ingredient) {
    const newRecipe = recipes.find(existingRecipe => existingRecipe === recipe);
    const previousRecipes = recipes.filter(
      existingRecipe => existingRecipe !== recipe
    );
    if (newRecipe) {
      const newIngredients = newRecipe.ingredients.filter(
        existingIngredient => existingIngredient.id !== ingredient.id
      );
      newRecipe.ingredients = newIngredients;
      setRecipes([...previousRecipes, newRecipe]);
    }
  }

  function deleteRecipeFromCookbook(cookbook, recipe) {
    const previousCookbooks = cookbooks.filter(
      existingCookbook => existingCookbook !== cookbook
    );
    const newCookbook = cookbooks.find(
      existingCookbook => existingCookbook === cookbook
    );
    if (newCookbook) {
      const newRecipes = newCookbook.recipes.filter(
        existingRecipes => existingRecipes !== recipe
      );
      newCookbook.recipes = [...newRecipes];
      setCookbooks([...previousCookbooks, newCookbook]);
    }
  }

  function isNameIsPresent(array, key, element) {
    let isPresent = false;
    array.map(item => {
      if (item[key].toLowerCase() === element.toLowerCase()) {
        isPresent = true;
        setPostError(true);
      }
    });
    return isPresent;
  }

  return (
    <Context.Provider
      value={{
        ingredients,
        recipes,
        cookbooks,
        ingredientIndex,
        recipeIndex,
        cookbookIndex,
        postError,
        setPostError,
        deleteIngredient,
        createIngredient,
        addIngredientToRecipe,
        createRecipe,
        deleteRecipe,
        createCookbook,
        deleteCookbook,
        addRecipeToCookbook,
        deleteRecipeFromCookbook,
        removeIngredientFromRecipe,
        isNameIsPresent,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
