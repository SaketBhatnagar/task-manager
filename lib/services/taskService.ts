import { api } from '../axios';
import type { Task, CreateTaskData, UpdateTaskData } from '../types';

interface TaskResponse {
  tasks: Task[];
}

interface SingleTaskResponse {
  task: Task;
}

export const taskService = {
  getTasks: async (): Promise<TaskResponse> => {
    return api<TaskResponse>({
      method: 'GET',
      url: '/api/tasks',
    });
  },

  getTaskById: async (id: string): Promise<SingleTaskResponse> => {
    return api<SingleTaskResponse>({
      method: 'GET',
      url: `/api/tasks/${id}`,
    });
  },

  createTask: async (data: CreateTaskData): Promise<SingleTaskResponse> => {
    return api<SingleTaskResponse>({
      method: 'POST',
      url: '/api/tasks',
      data,
    });
  },

  updateTask: async (data: UpdateTaskData): Promise<SingleTaskResponse> => {
    return api<SingleTaskResponse>({
      method: 'PUT',
      url: `/api/tasks/${data.id}`,
      data,
    });
  },

  deleteTask: async (id: string): Promise<void> => {
    return api<void>({
      method: 'DELETE',
      url: `/api/tasks/${id}`,
    });
  },
};
