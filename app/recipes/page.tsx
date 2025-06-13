'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchRecipes } from '@/lib/hooks/queries/useRecipes';
import { Recipe } from '@/lib/services/recipeService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  //  debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useSearchRecipes(debouncedQuery);

  const getIngredients = (recipe: Recipe): string[] => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(
          `${measure?.trim() || ''} ${ingredient.trim()}`.trim(),
        );
      }
    }
    return ingredients;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                Recipe Collection
              </h1>
            </div>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading recipes...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">
              Error loading recipes. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !error && recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No recipes found. Try a different search term.
            </p>
          </div>
        )}

        <div className="rounded-md border bg-white overflow-x-auto">
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Ingredients</TableHead>
                  <TableHead>Instructions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipes.map((recipe, idx) => {
                  const ingredients = getIngredients(recipe);
                  const showPopover = ingredients.length > 3;
                  return (
                    <TableRow
                      key={recipe.idMeal}
                      className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <TableCell>
                        <div className="relative h-16 w-16 min-w-[4rem]">
                          <Image
                            src={recipe.strMealThumb || '/placeholder.svg'}
                            alt={recipe.strMeal}
                            fill
                            className="object-cover rounded-md border"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium align-top">
                        {recipe.strMeal}
                      </TableCell>
                      <TableCell className="align-top">
                        <Badge variant="secondary">{recipe.strCategory}</Badge>
                      </TableCell>
                      <TableCell className="align-top">
                        <Badge variant="outline">{recipe.strArea}</Badge>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="text-sm text-gray-600 space-y-1">
                          {ingredients.slice(0, 3).map((ingredient, index) => (
                            <div key={index}>• {ingredient}</div>
                          ))}
                          {showPopover && (
                            <Popover>
                              <PopoverTrigger asChild>
                                <button className="text-xs text-blue-500 underline cursor-pointer">
                                  +{ingredients.length - 3} more
                                </button>
                              </PopoverTrigger>
                              <PopoverContent side="right">
                                <div className="font-semibold mb-2">
                                  All Ingredients
                                </div>
                                <ul className="text-sm text-gray-700 list-disc pl-4">
                                  {ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                  ))}
                                </ul>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="align-top max-w-xs">
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="cursor-pointer">
                              <p className="text-sm text-gray-600 line-clamp-2 max-w-[320px]">
                                {recipe.strInstructions}
                              </p>
                              {recipe.strInstructions &&
                                recipe.strInstructions.length > 120 && (
                                  <span className="text-xs text-blue-500 underline">
                                    Read more
                                  </span>
                                )}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent side="top" className="max-w-md">
                            <div className="font-semibold mb-2">
                              Instructions
                            </div>
                            <p className="whitespace-pre-line text-sm text-gray-700">
                              {recipe.strInstructions}
                            </p>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
