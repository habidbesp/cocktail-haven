import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const categories = useAppStore((state) => state.categories.drinks);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);
  const showNotification = useAppStore((state) => state.showNotification);

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(searchFilters).includes("")) {
      showNotification({
        text: "All Fields are required",
        error: true,
      });
      return;
    }

    // call a function that fetches recipes from the API
    searchRecipes(searchFilters);
  };

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div className="">
            <img src="/logo.svg" alt="brand logo" className="w-32" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favorites
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Name or Ingredients
              </label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Name or ingredient (e.g., Vodka, Tequila, Coffee)"
                value={searchFilters.ingredient}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                value={searchFilters.category}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                {categories.map((categorie) => (
                  <option
                    key={categorie.strCategory}
                    value={categorie.strCategory}
                  >
                    {categorie.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Find Recipes"
              className="cursor-pointer bg-orange-800 text-white font-extrabold w-full p-2 rounded-lg uppercase hover:bg-orange-900 "
            />
          </form>
        )}
      </div>
    </header>
  );
}
