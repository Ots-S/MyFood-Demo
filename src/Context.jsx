import React, { useState, useEffect, createContext } from "react";

const Context = createContext();

function ContextProvider(props) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [cookbooks, setCookbooks] = useState([]);
  const [getError, setGetError] = useState();
  const [postError, setPostError] = useState();
  const [idNumber, setIdNumber] = useState(6);
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
      name: "Carottes",
      image:
        "https://img.cuisineaz.com/660x660/2018-07-02/i140767-soupe-de-fanes-de-carottes.jpeg",
    },
    {
      id: 4,
      name: "Riz",
      image:
        "https://www.boomerang.bio/wp-content/uploads/2019/03/riz_basmati_blanc_bio_vrac.jpg",
    },
    {
      id: 5,
      name: "Coriandre",
      image:
        "https://www.canalvie.com/polopoly_fs/1.1182904!/image/coriandre.jpg_gen/derivatives/max_568/coriandre.jpg",
    },
    {
      id: 6,
      name: "Beurre de cacahuète",
      image:
        "https://blog.labrigadedevero.com/wp-content/uploads/sites/4/2019/10/beurre-de-cacahu%C3%A8te.jpg",
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
    setIdCookbookNumer(prevState => prevState + 1);
  }

  async function deleteIngredient(ingredient) {
    const newIngredientsList = ingredients.filter(
      existingIngredient => existingIngredient !== ingredient
    );
    setIngredients(newIngredientsList);
    setIdNumber(prevState => prevState--);
    let recipeToModify = {};
    recipes.forEach(existingRecipe => {
      existingRecipe.ingredients.forEach(existingIngredient => {
        if (existingIngredient.id === ingredient.id) {
          recipeToModify = existingRecipe;
        }
      });
    });
    console.log("deleteIgredient", recipeToModify, ingredient);
    removeIngredientFromRecipe(recipeToModify, ingredient);
  }

  function deleteRecipe(recipe) {
    const newRecipes = recipes.filter(
      existingRecipe => existingRecipe !== recipe
    );
    setRecipes(newRecipes);
    setIdRecipeNumber(prevState => prevState--);
  }

  function deleteCookbook(cookbook) {
    const newCookbooks = cookbooks.filter(
      existingCookbook => existingCookbook !== cookbook
    );
    setCookbooks(newCookbooks);
    setIdCookbookNumer(prevState => prevState--);
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
    console.log(ingredient);
    const newRecipe = recipes.find(existingRecipe => existingRecipe === recipe);
    const previousRecipes = recipes.filter(
      existingRecipe => existingRecipe !== recipe
    );
    const newIngredients = newRecipe.ingredients.filter(
      existingIngredient => existingIngredient.id !== ingredient.id
    );
    newRecipe.ingredients = newIngredients;

    setRecipes([...previousRecipes, newRecipe]);
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
        ingredients,
        recipes,
        cookbooks,
        postError,
        setPostError,
        idNumber,
        getError,
        setGetError,
        deleteIngredient,
        createIngredient,
        addIngredientToRecipe,
        createRecipe,
        idRecipeNumber,
        deleteRecipe,
        createCookbook,
        deleteCookbook,
        addRecipeToCookbook,
        idCookbookNumber,
        deleteRecipeFromCookbook,
        removeIngredientFromRecipe,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
