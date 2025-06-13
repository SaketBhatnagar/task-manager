'use client';

import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './task-card';
import type { Task, TaskStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TaskColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  className?: string;
}

export function TaskColumn({
  status,
  title,
  tasks,
  className,
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'rounded-lg border p-4 transition-colors flex flex-col',
        isOver && 'bg-gray-50',
        className,
      )}
    >
      <h2 className="font-semibold mb-4">{title}</h2>
      <div className="space-y-3 flex-1 overflow-y-auto">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
