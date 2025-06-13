import { api } from '../axios';
import {
  ApiResponse,
  CreateUserDto,
  PaginatedResponse,
  UpdateUserDto,
  User,
} from '../types/api';

const BASE_URL = '/users';

export const userService = {
  // Get all users with pagination
  getUsers: async (page = 1, limit = 10) => {
    return api<PaginatedResponse<User>>({
      method: 'GET',
      url: BASE_URL,
      params: { page, limit },
    });
  },

  // Get a single user by ID
  getUser: async (id: string) => {
    return api<ApiResponse<User>>({
      method: 'GET',
      url: `${BASE_URL}/${id}`,
    });
  },

  // Create a new user
  createUser: async (data: CreateUserDto) => {
    return api<ApiResponse<User>>({
      method: 'POST',
      url: BASE_URL,
      data,
    });
  },

  // Update a user
  updateUser: async (id: string, data: UpdateUserDto) => {
    return api<ApiResponse<User>>({
      method: 'PUT',
      url: `${BASE_URL}/${id}`,
      data,
    });
  },

  // Delete a user
  deleteUser: async (id: string) => {
    return api<ApiResponse<void>>({
      method: 'DELETE',
      url: `${BASE_URL}/${id}`,
    });
  },
};
