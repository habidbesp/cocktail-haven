import { z } from "zod";
import {
  CategoriesAPIResponseSchema,
  DrinkAPIResponse,
  DrinksAPIResponse,
  searchFilterSchema,
} from "../utils/recipies-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof searchFilterSchema>;
export type Drinks = z.infer<typeof DrinksAPIResponse>;
export type Drink = z.infer<typeof DrinkAPIResponse>;
