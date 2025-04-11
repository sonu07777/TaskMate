import express from "express";
import {
  addTodo,
  editTodo,
  fetchTodo,
  addTasks,
  fetchTask,
  editTask,
  deleteTodoList,
  deleteTaskList,
  updateTaskStatus,
  selectAllTasks,
  unselectAllTask,
} from "../Controller/TODO.controller.js";
import { isLogged_in } from "../Middleware/Authentication.middleware.js";
import { todoVerify } from "../Middleware/TodoVerify.middleware.js";
import validation, {
  validateZodRequest,
} from "../Middleware/zodValidation.middleware.js";
import {
  createTodoSchema,
  addTaskItemSchema,
  editTodoTitleSchema,
  editTaskBodySchema,
  editTaskParamsSchema,
  updateTaskStatusParamsSchema,
  updateTaskStatusBodySchema,
  taskListIdParamSchema,
} from "../Schema/zod.TodoValidation.schema.js";

const router = express.Router();

router.post("/addTodo", isLogged_in, validation(createTodoSchema), addTodo);
router.post(
  "/addTask/:id",
  isLogged_in,
  validation(addTaskItemSchema),
  addTasks
);
router.get("/getAllTodo", isLogged_in, fetchTodo);
router.get("/fetchTask/:titleId", isLogged_in, fetchTask);
router.post(
  "/editTodo",
  isLogged_in,
  validation(editTodoTitleSchema),
  editTodo
);
router.put(
  "/editTask/:taskListId",
  isLogged_in,
  validateZodRequest({
    body: editTaskBodySchema,
    params: editTaskParamsSchema,
  }),
  editTask
);
router.delete("/deleteTodo/:taskListId", isLogged_in, deleteTodoList);
router.delete("/deleteTask/:taskListId/:taskId", isLogged_in, deleteTaskList);
router.put(
  "/updateTaskStatus/:taskListId/:taskId",
  isLogged_in,
  validateZodRequest({
    params: updateTaskStatusParamsSchema,
    body: updateTaskStatusBodySchema,
  }),
  updateTaskStatus
);
router.patch(
  "/selectAll_Task/:taskListId/",
  isLogged_in,
  validateZodRequest({ params: taskListIdParamSchema }),
  selectAllTasks
);
router.patch(
  "/unselectAll_Task/:taskListId/",
  isLogged_in,
  validateZodRequest({ params: taskListIdParamSchema }),
  unselectAllTask
);

export default router;
