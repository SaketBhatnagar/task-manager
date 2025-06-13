'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { useTaskStore } from '@/lib/store';
import { TaskColumn } from './task-column';
import type { TaskStatus } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './task-card';
import { cn } from '@/lib/utils';

const COLUMNS: { status: TaskStatus; title: string; color: string }[] = [
  { status: 'To Do', title: 'To Do', color: 'bg-gray-100 border-gray-200' },
  {
    status: 'In Progress',
    title: 'In Progress',
    color: 'bg-blue-50 border-blue-200',
  },
  { status: 'Done', title: 'Done', color: 'bg-green-50 border-green-200' },
];

export function TaskBoard() {
  const { tasks, filters, isLoading, error, updateTask } = useTaskStore();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [overStatus, setOverStatus] = React.useState<TaskStatus | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (
        filters.search &&
        !task.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [tasks, filters]);

  const tasksByStatus = useMemo(() => {
    return COLUMNS.reduce((acc, column) => {
      acc[column.status] = filteredTasks.filter(
        (task) => task.status === column.status,
      );
      return acc;
    }, {} as Record<TaskStatus, typeof filteredTasks>);
  }, [filteredTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) {
      setOverStatus(null);
      return;
    }

    const newStatus = over.id as TaskStatus;
    setOverStatus(newStatus);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverStatus(null);

    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as TaskStatus;
      const task = tasks.find((t) => t.id === taskId);

      if (task && task.status !== newStatus) {
        updateTask({ id: taskId, status: newStatus });
      }
    }
  };

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => useTaskStore.getState().setError(null)}
        >
          Dismiss
        </Button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">
          No tasks yet. Create your first task to get started!
        </p>
        <Button
          onClick={() => document.getElementById('create-task-button')?.click()}
        >
          Create Task
        </Button>
      </div>
    );
  }

  const activeTask = activeId
    ? tasks.find((task) => task.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {COLUMNS.map((column) => (
          <TaskColumn
            key={column.status}
            status={column.status}
            title={column.title}
            tasks={tasksByStatus[column.status] || []}
            className={cn(
              column.color,
              overStatus === column.status && 'bg-gray-50',
            )}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
