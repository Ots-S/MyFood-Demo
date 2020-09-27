import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const Context = createContext();

function ContextProvider(props) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [cookbooks, setCookbooks] = useState([]);
  const [getError, setGetError] = useState();
  const [postError, setPostError] = useState();
  const [idNumber, setIdNumber] = useState(4);
  const [idRecipeNumber, setIdRecipeNumber] = useState(1);
  const [idCookbookNumber, setIdCookbookNumer] = useState(0);

  const ingredientsList = [
    {
      id: 1,
      name: "Nouilles de riz",
      image:
        "https://storage.googleapis.com/cdn-recette-ramen-site-19/production/2019/08/Ramen-pate.jpg",
    },
    {
      id: 2,
      name: "Tofu",
      image:
        "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2020.2F04.2F09.2F4d1092e9-abd1-4042-ab2b-257278ce26fa.2Ejpeg/1200x1200/quality/80/crop-from/center/quels-sont-les-bienfaits-sante-du-tofu.jpeg",
    },
    {
      id: 3,
      name: "Carotte",
      image:
        "https://img.cuisineaz.com/660x660/2018-07-02/i140767-soupe-de-fanes-de-carottes.jpeg",
    },
    {
      id: 4,
      name: "Test",
      image:
        "https://img.cuisineaz.com/660x660/2018-07-02/i140767-soupe-de-fanes-de-carottes.jpeg",
    },
  ];

  const recipesList = [
    {
      id: 1,
      name: "Pad Thaï",
      image: "https://www.pranasnacks.com/media/prana_recipe/recipe_288.jpg",
      ingredients: [
        {
          id: 1,
          name: "Riz",
          image:
            "https://www.boomerang.bio/wp-content/uploads/2019/03/riz_basmati_blanc_bio_vrac.jpg",
        },
        {
          id: 2,
          name: "Tofu",
          image:
            "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2020.2F04.2F09.2F4d1092e9-abd1-4042-ab2b-257278ce26fa.2Ejpeg/1200x1200/quality/80/crop-from/center/quels-sont-les-bienfaits-sante-du-tofu.jpeg",
        },
        {
          id: 3,
          name: "Carotte",
          image:
            "https://img.cuisineaz.com/660x660/2018-07-02/i140767-soupe-de-fanes-de-carottes.jpeg",
        },
      ],
    },
  ];

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
      setPostError(406);
    } else {
      setIngredients([...ingredients, ingredient]);
      setIdNumber(prevState => prevState + 1);
    }
  }

  function createRecipe(recipe) {
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);
    setIdRecipeNumber(prevState => prevState + 1);
  }

  function createCookbook(cookbook) {
    const newCookooks = [...cookbooks, cookbook];
    setCookbooks(newCookooks);
  }

  function deleteIngredient(ingredient) {
    const newIngredientsList = ingredients.filter(
      existingIngredient => existingIngredient !== ingredient
    );
    setIngredients(newIngredientsList);
    setIdNumber(prevState => prevState--);
  }

  function deleteRecipe(recipe) {
    const newRecipes = recipes.filter(
      existingRecipe => existingRecipe !== recipe
    );
    setRecipes(newRecipes);
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

  function deleteRecipeFromCookbook(cookbook, recipe) {
    const previousCookbooks = cookbooks.filter(
      existingCookbook => existingCookbook !== cookbook
    );
    const newCookbook = cookbooks.find(
      existingCookbook => existingCookbook === cookbook
    );
    const newRecipes = newCookbook.recipes.filter(
      existingRecipes => existingRecipes !== recipe
    );
    newCookbook.recipes = [...newRecipes];
    setCookbooks([...previousCookbooks, newCookbook]);
  }

  return (
    <Context.Provider
      value={{
        postError,
        setPostError,
        idNumber,
        ingredients,
        recipes,
        getError,
        setGetError,
        deleteIngredient,
        createIngredient,
        addIngredientToRecipe,
        createRecipe,
        idRecipeNumber,
        deleteRecipe,
        createCookbook,
        cookbooks,
        deleteCookbook,
        addRecipeToCookbook,
        idCookbookNumber,
        deleteRecipeFromCookbook,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
