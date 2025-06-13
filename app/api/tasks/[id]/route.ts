import { type NextRequest, NextResponse } from 'next/server';
import type { Task, UpdateTaskData } from '@/lib/types';

// In-memory storage
const tasks: Task[] = [
  {
    id: '1',
    title: 'Setup project repository',
    description:
      'Initialize the project with Next.js and configure the basic structure',
    status: 'Done',
    priority: 'High',
    dueDate: '2024-01-15',
    assignee: 'John Doe',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
  },
  {
    id: '2',
    title: 'Design user interface mockups',
    description:
      'Create wireframes and mockups for the main application screens',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2024-01-20',
    assignee: 'Jane Smith',
    createdAt: '2024-01-11T09:00:00Z',
    updatedAt: '2024-01-13T11:15:00Z',
  },
  {
    id: '3',
    title: 'Implement authentication system',
    description:
      'Set up user authentication with login, register, and password reset functionality',
    status: 'To Do',
    priority: 'High',
    dueDate: '2024-01-25',
    assignee: 'Mike Johnson',
    createdAt: '2024-01-12T08:30:00Z',
    updatedAt: '2024-01-12T08:30:00Z',
  },
  {
    id: '4',
    title: 'Write unit tests',
    description:
      'Create comprehensive unit tests for all components and utilities',
    status: 'To Do',
    priority: 'Medium',
    assignee: 'Sarah Wilson',
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z',
  },
  {
    id: '5',
    title: 'Optimize performance',
    description:
      'Analyze and improve application performance, implement lazy loading',
    status: 'To Do',
    priority: 'Low',
    dueDate: '2024-02-01',
    createdAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-14T12:00:00Z',
  },
];

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data: Partial<UpdateTaskData> = await request.json();

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    tasks.splice(taskIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 400 },
    );
  }
}
