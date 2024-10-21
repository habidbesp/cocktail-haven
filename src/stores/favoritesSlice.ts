import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createRecipesSlice, RecipiesSliceType } from "./recipeSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipiesSliceType & NotificationSliceType,
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

      createNotificationSlice(set, get, api).showNotification({
        text: "Removed from favorites.",
        error: false,
      });
    } else {
      set((state) => ({ favorites: [...state.favorites, recipie] }));

      createNotificationSlice(set, get, api).showNotification({
        text: "Added to favorites.",
        error: false,
      });
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
