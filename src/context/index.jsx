import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    console.log("searchParam:", searchParam);

    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${encodeURIComponent(
          searchParam
        )}`
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
      }

      setLoading(false);
      setSearchParam(""); // Clear search input
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    console.log(getCurrentItem);
    let copyFavoritesList = [...favoritesList];
    const index = copyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      // Add item to the favorites list if it doesn't exist
      copyFavoritesList.push(getCurrentItem);
    } else {
      // Corrected: Remove only the item at the found index
      copyFavoritesList.splice(index, 1);
    }

    // Update the state with the modified favorites list
    setFavoritesList(copyFavoritesList);
  }

  console.log(favoritesList, "favoritesList");

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Add propTypes for validation
GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};
