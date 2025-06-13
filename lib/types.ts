export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  assignee?: string
  createdAt: string
  updatedAt: string
}

export type TaskStatus = "To Do" | "In Progress" | "Done"
export type TaskPriority = "Low" | "Medium" | "High"

export interface TaskFilters {
  status?: TaskStatus
  priority?: TaskPriority
  search?: string
}

export interface CreateTaskData {
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  assignee?: string
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  id: string
}
