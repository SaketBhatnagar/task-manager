import { type NextRequest, NextResponse } from 'next/server';
import type { Task, CreateTaskData } from '@/lib/types';

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

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  try {
    const data: CreateTaskData = await request.json();

    // Validate required fields
    if (!data.title || !data.status || !data.priority) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const newTask: Task = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task', details: String(error) },
      { status: 400 },
    );
  }
}
