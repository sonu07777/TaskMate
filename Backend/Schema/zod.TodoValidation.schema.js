import { z } from "zod";

// Individual Task item inside the 'tasks' array
// const taskItemSchema = z.object({
//   todoData: z.string().min(1, "Task text is required"),
//   finished: z.boolean().optional().default(false),
// });

// // Title schema
// const titleSchema = z.object({
//   name: z.string().min(1, "Title name is required"),
//   tasks: z.array(taskItemSchema).optional().default([]),
// });

// // Main Task schema (Zod)
// export const taskZodSchema = z.object({
//   user: z.string().min(1, "User ID is required").regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
//   title: titleSchema,
//   createdAt: z.date().optional(), // Optional because Mongoose sets it automatically
// });

export const createTodoSchema = z.object({
  name: z.string().min(1, "Task list name is required"),
});

export const addTaskItemSchema = z.object({
  todoData: z.string().min(1, "Task description is required"),
  finished: z.boolean().optional().default(false),
});


export const editTodoTitleSchema = z.object({
  taskListId: z
    .string()
    .min(1, "Task List ID is required")
    .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
  newName: z
    .string()
    .min(1, "New title name is required")
    .max(100, "Title name is too long"),
});

export const editTaskParamsSchema = z.object({
  taskListId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid Task List ID"),
});

export const editTaskBodySchema = z.object({
  _id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid Task ID"),
  todoData: z.string().optional(),
  finished: z.boolean().optional(),
});


export const updateTaskStatusParamsSchema = z.object({
  taskListId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid Task List ID"),
  taskId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid Task ID"),
});

export const updateTaskStatusBodySchema = z.object({
  finished: z.boolean({
    required_error: "Finished field is required",
    invalid_type_error: "Finished must be a boolean",
  }),
});

export const taskListIdParamSchema = z.object({
  taskListId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid Task List ID"),
});


