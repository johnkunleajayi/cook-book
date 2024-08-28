import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await response.json();
        if (data?.data?.recipe) {
          setRecipeDetailsData(data.data.recipe);
        } else {
          console.error("No recipe data found");
        }
      } catch (error) {
        console.error("Failed to fetch recipe details:", error);
      }
    }

    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  if (!recipeDetailsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-t-xl group">
          <img
            src={recipeDetailsData.image_url}
            alt="Recipe"
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-red-700">
          {recipeDetailsData.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddToFavorite(recipeDetailsData)}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {favoritesList && favoritesList.length > 0 &&
            favoritesList.findIndex(
              (item) => item.id === recipeDetailsData.id
            ) !== -1
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
        <div>
          <span className="text-xl font-semibold text-black">Ingredients:</span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData.ingredients?.map((ingredient, index) => (
              <li key={ingredient.description + index}>
                <span className="text-xl font-semibold text-black">
                  {ingredient.quantity || ""} {ingredient.unit || ""}
                </span>
                <span className="text-xl font-semibold text-black">
                  {ingredient.description || ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


