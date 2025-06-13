"use client"

import { useState } from "react"
import { TaskBoard } from "@/components/task-board"
import { TaskFilters } from "@/components/task-filters"
import { CreateTaskDialog } from "@/components/create-task-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function TasksPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">Task Manager</h1>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} id="create-task-button">
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <TaskFilters />
        <TaskBoard />
      </div>

      <CreateTaskDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  )
}
