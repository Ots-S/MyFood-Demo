import React, { useState, useEffect, createContext } from "react";

const Context = createContext();

function ContextProvider(props) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [cookbooks, setCookbooks] = useState([]);
  const [postError, setPostError] = useState(false);
  const [ingredientIndex, setIngredientIndex] = useState(9);
  const [recipeIndex, setRecipeIndex] = useState(2);
  const [cookookIndex, setCookbookIndex] = useState(0);

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
    {
      id: 7,
      name: "Poireaux",
      image:
        "https://www.notretemps.com/cache/com_zoo_images/c2/bienfaits-poireaux_3c85175fefcb924f9fc83ab832006c79.jpg",
    },
    {
      id: 8,
      name: "Farine",
      image:
        "https://i.f1g.fr/media/madame/1900x1900/sites/default/files/img/2017/01/farine.jpg",
    },
    {
      id: 9,
      name: "Tomates",
      image:
        "https://medias.pourlascience.fr/api/v1/images/view/5a82b0f78fe56f227c7d9cbb/wide_1300/image.jpg",
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
    {
      id: 2,
      name: "Tarte aux poireaux",
      image:
        "https://bloomingnolwenn.com/wp-content/uploads/2018/11/IMG_3285-1-720x720.jpg",
      ingredients: [
        {
          id: 7,
          name: "Poireaux",
          image:
            "https://www.notretemps.com/cache/com_zoo_images/c2/bienfaits-poireaux_3c85175fefcb924f9fc83ab832006c79.jpg",
        },
        {
          id: 8,
          name: "Farine",
          image:
            "https://i.f1g.fr/media/madame/1900x1900/sites/default/files/img/2017/01/farine.jpg",
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
      setPostError(true);
    } else {
      setIngredients([...ingredients, ingredient]);
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

  async function deleteIngredient(ingredient) {
    const newIngredientsList = ingredients.filter(
      existingIngredient => existingIngredient !== ingredient
    );
    setIngredients(newIngredientsList);
    setIngredientIndex(prevState => prevState--);
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
    setRecipeIndex(prevState => prevState--);
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
    setCookbookIndex(prevState => prevState--);
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
        idNumber: ingredientIndex,
        deleteIngredient,
        createIngredient,
        addIngredientToRecipe,
        createRecipe,
        idRecipeNumber: recipeIndex,
        deleteRecipe,
        createCookbook,
        deleteCookbook,
        addRecipeToCookbook,
        idCookbookNumber: cookookIndex,
        deleteRecipeFromCookbook,
        removeIngredientFromRecipe,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
