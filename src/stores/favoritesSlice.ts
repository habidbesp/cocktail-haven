import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createRecipesSlice, RecipiesSliceType } from "./recipeSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipiesSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipie) => {
    if (get().favoriteExists(recipie.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipie.idDrink
        ),
      }));
    } else {
      set((state) => ({ favorites: [...state.favorites, recipie] }));
    }
    createRecipesSlice(set, get, api).closeModal();
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
