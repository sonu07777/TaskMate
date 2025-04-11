// zod.todo.schema.ts
import { z } from "zod";

// Schema to validate individual tasks inside the title
const taskItemSchema = z.object({
  id: z.number().optional(), // assuming this is auto-generated or optional
  todoData: z.string().min(1, "Task content is required"),
  finished: z.boolean().optional(), // defaults handled in Mongoose
});

// Schema for the "title" field (which has name and tasks array)
const titleSchema = z.object({
  name: z.string().min(1, "Title name is required"),
  tasks: z.array(taskItemSchema).optional(), // tasks can be added later
});

// Final schema for the Todo document
export const todoZodSchema = z.object({
  user: z.string().min(1, "User ID is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  title: titleSchema,
});
