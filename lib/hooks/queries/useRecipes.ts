import { useQuery } from '@tanstack/react-query';
import { recipeService } from '../../services/recipeService';

export const useSearchRecipes = (query: string) => {
  return useQuery({
    queryKey: ['recipes', 'search', query],
    queryFn: () => recipeService.searchRecipes(query),
    select: (data) => data.meals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: true, // Always enable the query
  });
};

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ['recipes', 'detail', id],
    queryFn: () => recipeService.getRecipeById(id),
    select: (data) => data.meals?.[0],
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['recipes', 'categories'],
    queryFn: () => recipeService.getCategories(),
    select: (data) => data.categories,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export const useRecipesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['recipes', 'category', category],
    queryFn: () => recipeService.getRecipesByCategory(category),
    select: (data) => data.meals,
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
