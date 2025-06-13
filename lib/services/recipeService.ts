import { api } from '../axios';
import { ApiResponse } from '../types/api';

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string;
}

export interface RecipeResponse {
  meals: Recipe[] | null;
}

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const recipeService = {
  searchRecipes: async (query: string) => {
    try {
      const endpoint = query.trim()
        ? `/search.php?s=${encodeURIComponent(query)}`
        : '/search.php?s=';

      const response = await api<RecipeResponse>({
        method: 'GET',
        url: `${BASE_URL}${endpoint}`,
      });

      // Ensure we always return an array, even if empty
      return {
        ...response,
        meals: response.meals || [],
      };
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  },

  getRecipeById: async (id: string) => {
    try {
      const response = await api<RecipeResponse>({
        method: 'GET',
        url: `${BASE_URL}/lookup.php?i=${id}`,
      });
      return response;
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      return await api<{
        categories: Array<{ idCategory: string; strCategory: string }>;
      }>({
        method: 'GET',
        url: `${BASE_URL}/categories.php`,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getRecipesByCategory: async (category: string) => {
    try {
      const response = await api<RecipeResponse>({
        method: 'GET',
        url: `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
      });
      return {
        ...response,
        meals: response.meals || [],
      };
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      throw error;
    }
  },
};
