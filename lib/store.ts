import { create } from 'zustand';
import type {
  Task,
  TaskFilters,
  CreateTaskData,
  UpdateTaskData,
} from './types';

interface TaskStore {
  tasks: Task[];
  filters: TaskFilters;
  isLoading: boolean;
  error: string | null;

  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: CreateTaskData) => Promise<Task>;
  updateTask: (data: UpdateTaskData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: Partial<TaskFilters>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Mock API functions
const api = {
  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  async updateTask(data: UpdateTaskData): Promise<Task> {
    const response = await fetch(`/api/tasks/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  },

  async getTasks(): Promise<Task[]> {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filters: {},
  isLoading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),

  addTask: async (data) => {
    set({ isLoading: true, error: null });
    try {
      let newTask: Task;

      try {
        newTask = await api.createTask(data);
      } catch (apiError) {
        console.error('API error, creating task locally:', apiError);

        newTask = {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));

      return newTask;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create task',
        isLoading: false,
      });
      throw error;
    }
  },

  updateTask: async (data) => {
    set({ isLoading: true, error: null });
    try {
      // Update local state
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === data.id
            ? { ...task, ...data, updatedAt: new Date().toISOString() }
            : task,
        ),
      }));

      try {
        await api.updateTask(data);
      } catch (apiError) {
        console.error('API error, keeping local update:', apiError);
        // If API fails, we keep the local update
      }

      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update task',
        isLoading: false,
      });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete task',
        isLoading: false,
      });
    }
  },

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  clearFilters: () => set({ filters: {} }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}));

// Initialize store with mock data
if (typeof window !== 'undefined') {
  // Load initial tasks
  api
    .getTasks()
    .then((tasks) => {
      useTaskStore.getState().setTasks(tasks);
    })
    .catch((error) => {
      useTaskStore.getState().setError('Failed to load tasks');
    });
}
