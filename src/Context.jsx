import React, { useState, useEffect, createContext } from "react";
import { ingredientsList, recipesList } from "./assets/datas.json";

const Context = createContext();

function ContextProvider(props) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [cookbooks, setCookbooks] = useState([]);
  const [postError, setPostError] = useState(false);
  const [ingredientIndex, setIngredientIndex] = useState(12);
  const [recipeIndex, setRecipeIndex] = useState(2);
  const [cookookIndex, setCookbookIndex] = useState(0);

  useEffect(() => {
    setIngredients(ingredientsList);
    setRecipes(recipesList);
  }, []);

  function createIngredient(ingredient) {
    let alreadyExist = false;
    ingredients.forEach(exisitingIngredient => {
      if (
        exisitingIngredient.name.toLowerCase() === ingredient.name.toLowerCase()
      ) {
        alreadyExist = true;
      }
    });
    if (alreadyExist) {
      setPostError(true);
    } else {
      setIngredients([ingredient, ...ingredients]);
      setIngredientIndex(prevState => prevState + 1);
    }
  }

  function createRecipe(recipe) {
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);
    setRecipeIndex(prevState => prevState + 1);
  }

  function createCookbook(cookbook) {
    const newCookooks = [...cookbooks, cookbook];
    setCookbooks(newCookooks);
    setCookbookIndex(prevState => prevState + 1);
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

  return (
    <Context.Provider
      value={{
        ingredients,
        recipes,
        cookbooks,
        postError,
        setPostError,
        ingredientIndex,
        deleteIngredient,
        createIngredient,
        addIngredientToRecipe,
        createRecipe,
        recipeIndex,
        deleteRecipe,
        createCookbook,
        deleteCookbook,
        addRecipeToCookbook,
        cookookIndex,
        deleteRecipeFromCookbook,
        removeIngredientFromRecipe,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
