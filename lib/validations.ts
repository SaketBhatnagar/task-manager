import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  status: z.enum(["To Do", "In Progress", "Done"]),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z
    .string()
    .optional()
    .refine((date) => {
      if (!date || date === "") return true
      const parsedDate = new Date(date)
      return !isNaN(parsedDate.getTime())
    }, "Please enter a valid date"),
  assignee: z.string().max(50, "Assignee name must be less than 50 characters").optional(),
})

export type TaskFormData = z.infer<typeof taskSchema>
