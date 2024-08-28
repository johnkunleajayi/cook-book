import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);

  console.log(searchParam);

  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
      <h2 className="text-2xl font-semibold ">
        <NavLink
          to={"/"}
          className="text-red-700 hover:text-gray-700 duration-300"
        >Continental Dishes CookBook
        </NavLink>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
          placeholder="Give me recipe for...🧑‍🍳🍜😋"
          className="bg-white/75 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
        ></input>
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-red-700 hover:text-gray-700 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className="text-red-700 hover:text-gray-700 duration-300"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
